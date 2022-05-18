package db

import (
	"database/sql"
	"fmt"
	"learning/backend/settings"

	_ "github.com/lib/pq"
)

var Link *sql.DB

func Connect(cfg settings.SettingServer) {
	var e error
	Link, e = sql.Open("postgres", fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		cfg.Database.DbHost,
		cfg.Database.DbPort,
		cfg.Database.DbUser,
		cfg.Database.DbPass,
		cfg.Database.DbName,
	))
	if e != nil {
		fmt.Println("Не получилось подключиться к базе данных!")
		fmt.Println(e)
		return
	}

	e = Link.Ping()
	if e != nil {
		fmt.Println("Нет подключения к базе данных!")
		fmt.Println(e)
		return
	}
}
