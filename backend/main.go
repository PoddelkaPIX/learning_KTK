package main

import (
	"learning/backend/db"
	"learning/backend/settings"
)

func main() {
	cfg := settings.Load("../settings.cfg")
	db.Connect(*cfg)
	StartRouter(*cfg)
}
