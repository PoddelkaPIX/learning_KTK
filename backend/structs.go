package main

type Program struct {
	Id                      string
	Title                   string
	Level                   string
	Type                    string
	Direction               string
	Training_form           string
	Training_form_reduction string
	Size                    string
	Length                  string
	Price                   string
	Place                   string
	Minimum_group_size      string
	Start_date              string
	Time_period             string
	Issued_document         string
	Requirement             string
	Requirement_reduction   string
	Status                  string
	Level_id                string
	Type_id                 string
	Direction_id            string
	Training_form_id        string
	Place_id                string
	Issued_document_id      string
	Requirement_id          string
	Status_id               string
	Plan					string
}


type Listener struct {
	Id                string
	Surname           string
	Name              string
	Patronymic        string
	Telephone         string
	Education         string
	Program           string
	Program_id        string
	Email             string
	Snils             string
	Birth_date        string
	Status            string
	Status_id         string
	Registration_date string
}

type Parameters struct {
	Levels         []Level
	Types          []Type
	Directions     []Direction
	Training_forms []Training_form
	Places         []Place
	Documents      []Document
	Requirements   []Requirements
}

type Type struct {
	Type string
	Id   string
}

type Training_form struct {
	Training_form string
	Reduction     string
	Id            string
}
type Place struct {
	Place string
	Id    string
}
type Level struct {
	Level string
	Id    string
}
type Direction struct {
	Direction string
	Id        string
}
type Document struct {
	Document string
	Id       string
}
type Requirements struct {
	Requirements string
	Reduction    string
	Id           string
}
