package main

import (
	"learning/backend/db"
	"learning/backend/utils"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/gin-gonic/gin"
)

func queryPrograms() []Program {
	var program_list []Program
	var program Program

	res, err := db.Link.Query(`SELECT "Program_passport"."Id", 
									"Program_passport"."Title", 
									"Program_level_list"."Level", 
									"Type_program_list"."Type",
									"Direction_study_list"."Direction",
									"Training_form_list"."Training_form",
									"Training_form_list"."Reduction",
									"Program_passport"."Size",
									"Program_passport"."Length",
									"Program_passport"."Price",
									"Place_list"."Place",
									"Program_passport"."Minimum_group_size",
									"Program_passport"."Start_date",
									"Program_passport"."Time_period",
									"Issued_document_list"."Document",
									"Requirements_listeners_list"."Requirement",
									"Requirements_listeners_list"."Reduction",
									"Program_status_list"."Status",
									"Program_passport"."Level_id",
									"Program_passport"."Type_id",
									"Program_passport"."Direction_study_id",
									"Program_passport"."Training_form_id",
									"Program_passport"."Place_id",
									"Program_passport"."Issued_document_id",
									"Program_passport"."Requirement_id",
									"Program_passport"."Status_id",
									"Program_passport"."Plan"
									FROM "Program_passport"
									JOIN "Place_list" ON "Place_list"."Id" = "Program_passport"."Place_id"
									JOIN "Training_form_list" ON "Training_form_list"."Id" = "Program_passport"."Training_form_id"
									JOIN "Type_program_list" ON "Type_program_list"."Id" = "Program_passport"."Type_id"
									JOIN "Program_level_list" ON "Program_level_list"."Id" = "Program_passport"."Level_id"
									JOIN "Direction_study_list" ON "Direction_study_list"."Id" = "Program_passport"."Direction_study_id"
									JOIN "Issued_document_list" ON "Issued_document_list"."Id" = "Program_passport"."Issued_document_id"
									JOIN "Requirements_listeners_list" ON "Requirements_listeners_list"."Id" = "Program_passport"."Requirement_id"
									JOIN "Program_status_list" ON "Program_status_list"."Id" = "Program_passport"."Status_id"
									order by "Status_id" ASC, "Title" ASC`)
	if err != nil {
		utils.Logger.Println(err)
		return nil
	}
	for res.Next() {
		res.Scan(&program.Id, &program.Title, &program.Level, &program.Type, &program.Direction,
			&program.Training_form, &program.Training_form_reduction, &program.Size, &program.Length, &program.Price, &program.Place,
			&program.Minimum_group_size, &program.Start_date, &program.Time_period,
			&program.Issued_document, &program.Requirement, &program.Requirement_reduction, &program.Status, &program.Level_id,
			&program.Type_id, &program.Direction_id, &program.Training_form_id, &program.Place_id,
			&program.Issued_document_id, &program.Requirement_id, &program.Status_id, &program.Plan)
		program_list = append(program_list, program)
	}
	if len(program_list) == 0{
		program_list = append(program_list, program)
	}

	if (program_list[0] == Program{}){
		return nil
	}else{
		return program_list
	}
}

func queryProgram(id string) Program {
	var program Program

	db.Link.QueryRow(`SELECT "Program_passport"."Id", 
						"Program_passport"."Title", 
						"Program_level_list"."Level", 
						"Type_program_list"."Type",
						"Direction_study_list"."Direction",
						"Training_form_list"."Training_form",
						"Training_form_list"."Reduction",
						"Program_passport"."Size",
						"Program_passport"."Length",
						"Program_passport"."Price",
						"Place_list"."Place",
						"Program_passport"."Minimum_group_size",
						"Program_passport"."Start_date",
						"Program_passport"."Time_period",
						"Issued_document_list"."Document",
						"Requirements_listeners_list"."Requirement",
						"Requirements_listeners_list"."Reduction",
						"Program_status_list"."Status",
						"Program_passport"."Level_id",
						"Program_passport"."Type_id",
						"Program_passport"."Direction_study_id",
						"Program_passport"."Training_form_id",
						"Program_passport"."Place_id",
						"Program_passport"."Issued_document_id",
						"Program_passport"."Requirement_id",
						"Program_passport"."Status_id",
						"Program_passport"."Plan"
						FROM "Program_passport"
						JOIN "Place_list" ON "Place_list"."Id" = "Program_passport"."Place_id"
						JOIN "Training_form_list" ON "Training_form_list"."Id" = "Program_passport"."Training_form_id"
						JOIN "Type_program_list" ON "Type_program_list"."Id" = "Program_passport"."Type_id"
						JOIN "Program_level_list" ON "Program_level_list"."Id" = "Program_passport"."Level_id"
						JOIN "Direction_study_list" ON "Direction_study_list"."Id" = "Program_passport"."Direction_study_id"
						JOIN "Issued_document_list" ON "Issued_document_list"."Id" = "Program_passport"."Issued_document_id"
						JOIN "Requirements_listeners_list" ON "Requirements_listeners_list"."Id" = "Program_passport"."Requirement_id"
						JOIN "Program_status_list" ON "Program_status_list"."Id" = "Program_passport"."Status_id"
						WHERE "Program_passport"."Id" = $1`, id).Scan(&program.Id, &program.Title, &program.Level, &program.Type, &program.Direction,
		&program.Training_form, &program.Training_form_reduction, &program.Size, &program.Length, &program.Price, &program.Place,
		&program.Minimum_group_size, &program.Start_date, &program.Time_period,
		&program.Issued_document, &program.Requirement, &program.Requirement_reduction, &program.Status, &program.Level_id,
		&program.Type_id, &program.Direction_id, &program.Training_form_id, &program.Place_id,
		&program.Issued_document_id, &program.Requirement_id, &program.Status_id, &program.Plan)

	return program
}

func queryListeners() []Listener {
	var listenersList []Listener
	var Lis Listener

	listeners, e := db.Link.Query(`SELECT "Listener"."Id",
											"Listener"."Surname",
											"Listener"."Name",
											"Listener"."Patronymic",
											"Listener"."Telephone",
											"Listener"."Education",
											"Program_passport"."Title",
											"Listener"."Program_id",
											"Listener"."Email",
											"Listener"."Snils",
											"Listener"."Birth_date",
											"Listener_status_list"."Status",
											"Listener"."Status_id",
											"Registration_date" 
											from "Listener"
											JOIN "Listener_status_list" ON "Listener_status_list"."Id" = "Listener"."Status_id"
											JOIN "Program_passport" ON "Program_passport"."Id" = "Listener"."Program_id"
											order by "Status_id" ASC, "Listener"."Surname" ASC`)
	if e != nil {
		utils.Logger.Println(e)
	}
	for listeners.Next() {
		listeners.Scan(&Lis.Id, &Lis.Surname, &Lis.Name, &Lis.Patronymic,
			&Lis.Telephone, &Lis.Education, &Lis.Program, &Lis.Program_id, &Lis.Email,
			&Lis.Snils, &Lis.Birth_date, &Lis.Status, &Lis.Status_id, &Lis.Registration_date)
		listenersList = append(listenersList, Lis)
	}
	if len(listenersList) == 0{
		listenersList = append(listenersList, Lis)
	}
	
	return listenersList
}

func queryListener(id string) Listener {
	var listeners Listener

	db.Link.QueryRow(`SELECT "Listener"."Id",
					"Listener"."Surname",
					"Listener"."Name",
					"Listener"."Patronymic",
					"Listener"."Telephone",
					"Listener"."Education",
					"Program_passport"."Title",
					"Listener"."Program_id",
					"Listener"."Email",
					"Listener"."Snils",
					"Listener"."Birth_date",
					"Listener_status_list"."Status",
					"Listener"."Status_id",
					"Registration_date" 
					from "Listener"
					JOIN "Listener_status_list" ON "Listener_status_list"."Id" = "Listener"."Status_id"
					JOIN "Program_passport" ON "Program_passport"."Id" = "Listener"."Program_id"
					WHERE  "Listener"."Id" = $1 `, id).Scan(&listeners.Id,
		&listeners.Surname, &listeners.Name, &listeners.Patronymic,
		&listeners.Telephone, &listeners.Education, &listeners.Program, &listeners.Program_id, &listeners.Email,
		&listeners.Snils, &listeners.Birth_date, &listeners.Status, &listeners.Status_id, &listeners.Registration_date)

	return listeners
}

func queryLoginAdmin(c *gin.Context) {
	login := c.PostForm("login")
	password := c.PostForm("password")
	res := false
	password, e := utils.Encrypt(password)
	if e != nil {
		utils.Logger.Println(e)
	}
	db.Link.QueryRow(`SELECT EXISTS(SELECT "Id" FROM "Admin" WHERE "Login" = $1 AND "Password" = $2)`, login, password).Scan(&res)
	if !res {
		c.Redirect(http.StatusFound, "/adminLogin")
		return
	}

	c.SetCookie("AdAuS", password, 3600*99999, "/", c.Request.URL.Hostname(), false, false)
	c.Redirect(http.StatusFound, "/")
}

func queryCheckAdmin(c *gin.Context) bool {
	var cookie, err = c.Cookie("AdAuS")
	if err != nil {
		utils.Logger.Println(err)
		return false
	}
	res := false
	db.Link.QueryRow(`SELECT EXISTS(SELECT "Id" FROM "Admin" WHERE "Password" = $1)`, cookie).Scan(&res)
	if !res {
		c.Redirect(http.StatusFound, "/")
		return false
	}
	return true
}
func queryChangeStatusProgram(c *gin.Context) {
	type input struct {
		Id     string `json:"Id"`
		Status string `json:"Status"`
	}
	i := input{}
	e := c.BindJSON(&i)
	if e != nil {
		utils.Logger.Println(e)
		c.JSON(400, nil)
		return
	}

	if i.Status == "1" { // Начать программу
		queryAddProgram(queryProgram(i.Id))
		queryChangeStatusGroup(i.Id, "1", "2")
		writeCurrentDate(i.Id, "Start_date")
	} else if i.Status == "2" { // Открыть
		queryChangeStatusGroup(i.Id, "5", "1")
	}else if i.Status == "3" { // Закончить
		writeCurrentDate(i.Id, "Time_period")
		queryChangeStatusGroup(i.Id, "2", "3")
	} else if i.Status == "4" { // Закрыть
		queryChangeStatusGroup(i.Id, "1", "5")
	}

	_, err := db.Link.Exec(`update "Program_passport" set "Status_id" = $1 where "Id" = $2`, i.Status, i.Id)
	if err != nil {
		utils.Logger.Println(err)
		return
	}
	c.JSON(200, nil)
}

func queryChangeStatusListener(c *gin.Context) {
	type input struct {
		Id     string `json:"Id"`
		Status string `json:"Status"`
	}
	i := input{}
	e := c.BindJSON(&i)
	if e != nil {
		utils.Logger.Println(e)
		c.JSON(400, nil)
		return
	}

	_, err := db.Link.Exec(`update "Listener" set "Status_id" = $1 where "Id" = $2`, i.Status, i.Id)
	if err != nil {
		utils.Logger.Println(err)
		return
	}
	c.JSON(200, nil)
}

func queryChangeStatusGroup(programId string, firstStatus string, newStatus string) {
	_, err := db.Link.Exec(`update "Listener" set "Status_id" = $1 where ("Program_id" = $2 AND "Status_id" = $3)`, newStatus, programId, firstStatus)
	if err != nil {
		utils.Logger.Println(err)
		return
	}
}

func queryEditProgram(c *gin.Context){
	type input struct {
		Id 				string
		Title    		string 
		Level       	string 
		Type 			string
		Direction  		string 
		Forma 			string
		Size 			string
		Length 			string
		Price 			string
		Place 			string
		Min_grup_size 	string
		Docum 			string
		Requirement 	string
		Plan string
	}

	var i input
	var program Program

	e := c.BindJSON(&i)
	if e != nil {
		c.JSON(400, nil)
		return
	}
	program.Id = i.Id
	program.Title = i.Title
	program.Level_id = i.Level
	program.Type_id = i.Type
	program.Direction_id = i.Direction
	program.Training_form_id = i.Forma
	program.Size = i.Size
	program.Length = i.Length
	program.Price = i.Price
	program.Place_id = i.Place
	program.Minimum_group_size = i.Min_grup_size
	program.Issued_document_id = i.Docum
	program.Requirement_id = i.Requirement
	program.Status_id = "2"
	program.Plan = i.Plan

	_, err := db.Link.Exec(`update "Program_passport" 
							set 
							"Title" = $1, 
							"Level_id" = $2, 
							"Type_id" = $3, 
							"Direction_study_id" = $4, 
							"Training_form_id" = $5, 
							"Size" = $6, 
							"Length" = $7, 
							"Price" = $8,
							"Place_id" = $9,
							"Minimum_group_size" = $10,
							"Issued_document_id" = $11,
							"Requirement_id" = $12,
							"Status_id" = $13,
							"Plan" = $14
							where "Id" = $15`, program.Title, program.Level_id, 
							program.Type_id, program.Direction_id, 
							program.Training_form_id, program.Size, 
							program.Length, program.Price, 
							program.Place_id, program.Minimum_group_size, 
							program.Issued_document_id, program.Requirement_id, 
							program.Status_id, program.Plan, program.Id)
				
	if err != nil {
		utils.Logger.Println(err)
		return
	}
	c.JSON(200, nil)
}

func queryEditListener(c *gin.Context) {
	type input struct {
		Id         string `json:"Id"`
		Surname    string `json:"Surname"`
		Name       string `json:"Name"`
		Patronymic string `json:"Patronymic"`
		Telephone  string `json:"Telephone"`
		Email      string `json:"Email"`
		Snils      string `json:"Snils"`
		Education  string `json:"Education"`
		Birth_date string `json:"Birth_date"`
	}
	i := input{}
	e := c.BindJSON(&i)
	if e != nil {
		utils.Logger.Println(e)
		c.JSON(400, nil)
		return
	}
	_, err := db.Link.Exec(`update "Listener" 
							set "Surname" = $1, "Name" = $2, 
							"Patronymic" = $3, "Telephone" = $4, "Email" = $5, "Snils" = $6, 
							"Education" = $7, "Birth_date" = $8
							where "Id" = $9`, i.Surname, i.Name, i.Patronymic,
		i.Telephone, i.Email, i.Snils, i.Education, i.Birth_date, i.Id)
	if err != nil {
		utils.Logger.Println(err)
		return
	}
	c.JSON(200, nil)
}

func queryDeleteProgram(c *gin.Context) {
	type input struct {
		ProgramId string `json:"id"`
	}
	i := input{}
	e := c.BindJSON(&i.ProgramId)
	if e != nil {
		utils.Logger.Println(e)
		c.JSON(400, nil)
		return
	}

	_, err := db.Link.Exec(`delete from "Program_passport" where "Id" = $1`, i.ProgramId)
	if err != nil {
		utils.Logger.Println(err)
		return
	}
	c.JSON(200, nil)
}

func queryDeleteListener(c *gin.Context) {
	type input struct {
		Lidtener_id string `json:"Listener_id"`
	}
	i := input{}
	e := c.BindJSON(&i.Lidtener_id)
	if e != nil {
		utils.Logger.Println(e)
		c.JSON(400, nil)
		return
	}

	_, err := db.Link.Exec(`delete from "Listener" where "Id" = $1`, i.Lidtener_id)
	if err != nil {
		utils.Logger.Println(err)
		return
	}
	c.JSON(200, nil)
}

func queryAddListener(c *gin.Context) {
	type input struct {
		Surname    string `json:"Surname"`
		Name       string `json:"Name"`
		Patronymic string `json:"Patronymic"`
		Telephone  string `json:"Telephone"`
		Email      string `json:"Email"`
		Snils      string `json:"Snils"`
		Education  string `json:"Education"`
		Birth_date string `json:"Birth_date"`
		Status     string `json:"Status"`
		Program_id string `json:"Program"`
	}
	i := input{}
	e := c.BindJSON(&i)
	if e != nil {
		utils.Logger.Println(e)
		c.JSON(400, nil)
		return
	}

	program_id_int, _ := strconv.ParseInt(i.Program_id, 10, 64)
	registration_date := time.Now().String()[:10]

	_, err := db.Link.Exec(`insert into "Listener" 
	("Surname", 
	"Name", 
	"Patronymic",
	"Birth_date",
	"Snils",
	"Email", 
	"Telephone", 
	"Education",
	"Status_id", 
	"Program_id", 
	"Registration_date") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
		i.Surname, i.Name, i.Patronymic, i.Birth_date, i.Snils, i.Email, i.Telephone, i.Education, i.Status, program_id_int, registration_date)
	if err != nil {
		utils.Logger.Println(err)
	}
	c.JSON(200, nil)
}

func queryEducations() []string {
	var educationList []string
	var ed string

	educations, e := db.Link.Query(`SELECT "Education" from "Education_list"`)
	if e != nil {
		utils.Logger.Println(e)
	}
	for educations.Next() {
		educations.Scan(&ed)
		educationList = append(educationList, ed)
	}

	return educationList
}

func queryParameters() Parameters {
	var type_program Type
	var training_form Training_form
	var place Place
	var program_level Level
	var direction_study Direction
	var issued_document Document
	var requirements_listeners Requirements
	var type_program_list []Type
	var training_form_list []Training_form
	var place_list []Place
	var program_level_list []Level
	var direction_study_list []Direction
	var issued_document_list []Document
	var requirements_listeners_list []Requirements
	var Parameters Parameters

	rows, e := db.Link.Query(`SELECT "Id", "Type" FROM "Type_program_list"`)
	if e != nil {
		utils.Logger.Println(e)
		Parameters.Types = nil
	}
	for rows.Next() {
		rows.Scan(&type_program.Id, &type_program.Type)
		type_program_list = append(type_program_list, type_program)
	}

	rows, e = db.Link.Query(`SELECT "Id", "Training_form", "Reduction" FROM "Training_form_list"`)
	if e != nil {
		utils.Logger.Println(e)
		training_form_list = nil
	}
	for rows.Next() {
		rows.Scan(&training_form.Id, &training_form.Training_form, &training_form.Reduction)
		training_form_list = append(training_form_list, training_form)
	}

	rows, e = db.Link.Query(`SELECT "Id", "Place" FROM "Place_list"`)
	if e != nil {
		utils.Logger.Println(e)
		place_list = nil
	}
	for rows.Next() {
		rows.Scan(&place.Id, &place.Place)
		place_list = append(place_list, place)
	}

	rows, e = db.Link.Query(`SELECT "Id", "Level" FROM "Program_level_list"`)
	if e != nil {
		utils.Logger.Println(e)
		program_level_list = nil
	}
	for rows.Next() {
		rows.Scan(&program_level.Id, &program_level.Level)
		program_level_list = append(program_level_list, program_level)
	}

	rows, e = db.Link.Query(`SELECT "Id", "Direction" FROM "Direction_study_list"`)
	if e != nil {
		utils.Logger.Println(e)
		direction_study_list = nil
	}
	for rows.Next() {
		rows.Scan(&direction_study.Id, &direction_study.Direction)
		direction_study_list = append(direction_study_list, direction_study)
	}

	rows, e = db.Link.Query(`SELECT "Id", "Document" FROM "Issued_document_list"`)
	if e != nil {
		utils.Logger.Println(e)
		issued_document_list = nil
	}
	for rows.Next() {
		rows.Scan(&issued_document.Id, &issued_document.Document)
		issued_document_list = append(issued_document_list, issued_document)
	}

	rows, e = db.Link.Query(`SELECT "Id", "Requirement", "Reduction" FROM "Requirements_listeners_list"`)
	if e != nil {
		utils.Logger.Println(e)
		requirements_listeners_list = nil
	}
	for rows.Next() {
		rows.Scan(&requirements_listeners.Id, &requirements_listeners.Requirements, &requirements_listeners.Reduction)
		requirements_listeners_list = append(requirements_listeners_list, requirements_listeners)
	}

	Parameters.Types = type_program_list
	Parameters.Training_forms = training_form_list
	Parameters.Places = place_list
	Parameters.Levels = program_level_list
	Parameters.Directions = direction_study_list
	Parameters.Documents = issued_document_list
	Parameters.Requirements = requirements_listeners_list
	return Parameters
}

func queryAddProgram(program Program) {
	typeProgram, _ := strconv.Atoi(program.Type_id)
	training_form, _ := strconv.Atoi(program.Training_form_id)
	place, _ := strconv.Atoi(program.Place_id)
	level, _ := strconv.Atoi(program.Level_id)
	direction, _ := strconv.Atoi(program.Direction_id)
	issued_document, _ := strconv.Atoi(program.Issued_document_id)
	requirement, _ := strconv.Atoi(program.Requirement_id)

	_, e := db.Link.Exec(`INSERT INTO "Program_passport" 
					("Type_id", 
					"Title", 
					"Training_form_id", 
					"Size",
					"Length",
					"Place_id",
					"Level_id",
					"Direction_study_id",
					"Price",
					"Minimum_group_size",
					"Start_date", 
					"Time_period",
					"Issued_document_id",
					"Requirement_id", 
					"Status_id",
					"Plan") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
		typeProgram, program.Title, training_form, program.Size, program.Length, place,
		level, direction, program.Price, program.Minimum_group_size, program.Start_date,
		program.Time_period, issued_document, requirement, 2, program.Plan)
	if e != nil {
		utils.Logger.Println(e)
		return
	}
}

func writeCurrentDate(id string, d string) {
	startDate := time.Now().String()[:10]
	_, e := db.Link.Exec(`update "Program_passport" 
	set "`+d+`" = $1 WHERE "Id" = $2`, startDate, id)
	if e != nil {
		utils.Logger.Println(e)
	}
}

func upload(c *gin.Context) {
	form, e := c.MultipartForm()
	if e != nil {
		utils.Logger.Println(e)
		c.JSON(400, nil)
		return
	}

	files := form.File["MyFiles"]

	for _, file := range files {
		e = c.SaveUploadedFile(file, "../resources/files/"+file.Filename)
		if e != nil {
			utils.Logger.Println(e)
			c.JSON(400, nil)
		}
	}
	c.JSON(200, nil)
}

func queryAboutProgramFileName(programId string) string{
	var name string
	db.Link.QueryRow(`select "Plan" from "Program_passport" where "Id" = $1`, programId).Scan(&name)
	return name
}

func createExcelListersList(c *gin.Context){
	var i string
	e := c.BindJSON(&i)
	if e != nil {
		utils.Logger.Println(e)
		c.JSON(400, nil)
		return
	}
	idListeners := strings.Split(i, ";")

	f := excelize.NewFile()
	f.SetCellValue("Sheet1", "A1", "№")
	f.SetCellValue("Sheet1", "B1", "Фамилия")
	f.SetCellValue("Sheet1", "C1", "Имя")
	f.SetCellValue("Sheet1", "D1", "Отчество")
	// f.SetCellValue("Sheet1", "E1", "Телефон")
	// f.SetCellValue("Sheet1", "F1", "Почта")
	// f.SetCellValue("Sheet1", "G1", "Снилc")
	// f.SetCellValue("Sheet1", "H1", "Образование")
	// f.SetCellValue("Sheet1", "I1", "Дата рождения")
	// f.SetCellValue("Sheet1", "J1", "Дата подачи заявления")
	for i, id := range idListeners {
		listener := queryListener(id)
		f.SetCellValue("Sheet1", "A" + strconv.Itoa(i + 2), i + 1)
		f.SetCellValue("Sheet1", "B" + strconv.Itoa(i + 2), listener.Surname)
		f.SetCellValue("Sheet1", "C" + strconv.Itoa(i + 2), listener.Name)
		f.SetCellValue("Sheet1", "D" + strconv.Itoa(i + 2), listener.Patronymic)
		// f.SetCellValue("Sheet1", "E" + strconv.Itoa(i + 2), listener.Telephone)
		// f.SetCellValue("Sheet1", "F" + strconv.Itoa(i + 2), listener.Email)
		// f.SetCellValue("Sheet1", "G" + strconv.Itoa(i + 2), listener.Snils)
		// f.SetCellValue("Sheet1", "H" + strconv.Itoa(i + 2), listener.Education)
		// f.SetCellValue("Sheet1", "I" + strconv.Itoa(i + 2), listener.Birth_date)
		// f.SetCellValue("Sheet1", "J" + strconv.Itoa(i + 2), listener.Registration_date)
	}
	f.SaveAs("text.xlsx")
	
	c.JSON(200, nil)
}


func excel(c *gin.Context){ // POST
	f , err:= excelize.OpenFile("text.xlsx")
	if err != nil{
		utils.Logger.Println(err)
		c.JSON(200, nil)
		return
	}

	hash, _ := utils.GenerateString(5)
	c.Header("Content-Type", "application/octet-stream")
	c.Header("Content-Disposition", "attachment; filename="+"Список слушателей " + hash + ".xlsx")
	c.Header("Content-Transfer-Encoding", "binary")

	_ = f.Write(c.Writer)
	os.Remove("text.xlsx")
	c.JSON(200, nil)
}

func queryLogoutAdmin(c *gin.Context){
	c.Redirect(http.StatusFound, "/")
	c.SetCookie("AdAuS", "", -1, "/", c.Request.URL.Hostname(), false, false)
}