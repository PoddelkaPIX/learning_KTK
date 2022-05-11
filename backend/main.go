package main

import (
	"learning/backend/db"
	"learning/backend/settings"
)

// it-ktkLearning45

func main() {
	cfg := settings.Load("../settings.cfg")
	db.Connect(*cfg)
	StartRouter(*cfg)
}
