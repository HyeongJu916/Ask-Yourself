const common = {
    charset: 'utf8mb4', // utf8 + 이모티콘 
    collate: 'utf8mb4_general_ci',  // utf8 + 이모티콘 getneral 또는 unicode 적용
    logging: true,
    underscored: true,
    dialectOptions: {
      useUTC: true, //for reading from database
      dateStrings: true, // ! 데이터 로드시 문자열로 가저옴
      typeCast: true, // ! 타임존을 역으로 계산하지 않음
    },
    timezone: '+09:00', //for writing to database
};

module.exports = {
    "development": {
        "username": "askyourself",
        "password": "askyourself",
        "database": "askyourself",
        "host": "askyourself.cuaq6vtotoo2.us-east-2.rds.amazonaws.com",
        "dialect": "mysql",
        ...common
    },
    "test": {
        "username": "askyourself",
        "password": "askyourself",
        "database": "askyourself",
        "host": "askyourself.cuaq6vtotoo2.us-east-2.rds.amazonaws.com",
        "dialect": "mysql",
        ...common
    },
    "production": {
        "username": "askyourself",
        "password": "askyourself",
        "database": "askyourself",
        "host": "askyourself.cuaq6vtotoo2.us-east-2.rds.amazonaws.com",
        "dialect": "mysql",
        ...common
    }
}
