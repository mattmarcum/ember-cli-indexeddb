1. migrations
    * framework
        - ecidb initializer starts up
            - get current app db version
            - open db with current version
            - add onversionchange callback
            - versionchange cb:
                + figure out version of db
                + play all migrations from db version to current app version
    * blueprint
        - look at current app db version and increment
        - create file setup with next db version
            + file has hook to run to massage data into new format if needed
2. adapter
    * minimal DS.Adapter
        - find
        - findAll
        - findQuery
        - generateIdForRecord
        - createRecord
        - updateRecord
        - deleteRecord
        - findMany
        - groupRecordsForFindMany


Unit test
  * ecidb initializer - get idb name from app config
