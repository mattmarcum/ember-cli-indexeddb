var tmp               = require('tmp-sync');
var path              = require('path');
var root              = process.cwd();
var tmproot           = path.join(root, 'tmp');
var MockProject       = require('ember-cli/tests/helpers/mock-project');
var MockUI            = require('ember-cli/tests/helpers/mock-ui');
var Promise           = require('ember-cli/lib/ext/promise');
var fs                = require('fs-extra');
var remove            = Promise.denodeify(fs.remove);
var walkSync          = require('walk-sync');
var expect            = require('chai').expect;
var EOL               = require('os').EOL;

var blueprintsFolder  = path.resolve(root, 'blueprints');
var ecidbBlueprint    = path.join(blueprintsFolder, 'ember-cli-indexeddb');
var blueprintClass    = require('ember-cli/lib/models/blueprint');

var basicBlueprintFiles = [
  "app/",
  "app/migrations/",
  "app/migrations/migration-manager.js"
];

describe('Ember-cli-indexeddb blueprint', function() {
  var blueprint;
  var ui;
  var project;
  var options;
  var tmpdir;

  beforeEach(function() {
    tmpdir    = tmp.in(tmproot);
    blueprint = new blueprintClass(ecidbBlueprint);
    ui        = new MockUI();
    project   = new MockProject();
    options   = {
      ui: ui,
      project: project,
      target: tmpdir
    };
  });

  afterEach(function() {
    return remove(tmproot);
  });

  it('installs basic files', function() {
    expect(!!blueprint).to.equal(true);

    return blueprint.install(options)
      .then(function() {
        var actualFiles = walkSync(tmpdir).sort();
        var output = ui.output.trim().split(EOL);
        expect(output.shift()).to.match(/^installing/);
        expect(output.shift()).to.match(/create.*/);// );
        expect(output.length).to.equal(0);

        expect(actualFiles).to.deep.equal(basicBlueprintFiles);

        expect( function(){
          fs.readFile(path.join(tmpdir , 'app/migrations/migration-manager.js'), 'utf-8',
              function(err, content){
                  if(err){
                      throw 'error';
                  }
              });
          }
        ).not.to.throw();

      });
  });
});
