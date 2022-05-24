package main

import (
	"io/ioutil"
	"learning/backend/settings"
	"net/http"
	"os"
	"strings"

	"learning/backend/utils"

	"github.com/gin-gonic/gin"
	docx "github.com/lukasjarosch/go-docx"
	"github.com/thinkerou/favicon"
)

var router *gin.Engine
var cfg *settings.SettingServer

func StartRouter(conf settings.SettingServer) {
	cfg = &conf
	router = gin.Default()
	router.GET("/", homePageHandler)
	router.GET("/adminPanel", adminPanelHandler)
	router.GET("/programPassport/:Id", programPassportHandler)
	router.GET("/adminLogin", adminLoginHandler)
	router.GET("/aboutProgram/:Id", aboutProgramHandler)
	router.GET("/excel", excel)
	router.GET("/downloadStatement", downloadStatement)

	router.POST("/api/excelList", createExcelListersList)
	router.POST("/api/createStatement/:Id", createStatement)
	router.POST("/api/getPrograms", getPrograms)
	router.POST("/api/getProgram/:Id", getProgram)
	router.POST("/api/getEducations", getEducations)
	router.POST("/api/getListeners", getListeners)
	router.POST("/api/getListener", getListener)
	router.POST("/api/getParameters", getParameters)
	router.POST("/api/AddListener", queryAddListener)
	router.POST("/api/addProgram", addProgram)
	router.POST("/api/loginAdmin", queryLoginAdmin)
	router.POST("/api/logoutAdmin", queryLogoutAdmin)
	router.POST("/api/checkAdmin", checkAdmin)
	router.POST("/api/upload", upload)

	router.PUT("/api/changeStatusListener", queryChangeStatusListener)
	router.PUT("/api/changeStatusProgram", queryChangeStatusProgram)
	router.PUT("/api/editListener", queryEditListener)
	router.PUT("/api/editProgram", queryEditProgram)

	router.DELETE("/api/deleteListener", queryDeleteListener)
	router.DELETE("/api/deleteProgram", queryDeleteProgram)

	router.LoadHTMLGlob("../frontend/templates/*.html")
	router.Static("/resources/", "../resources")
	router.Static("/js/", "../frontend/js")
	router.Static("/css/", "../frontend/css")
	router.Use(favicon.New("../resources/favicon.ico"))
	_ = router.Run(cfg.Host + ":" + cfg.Port)
}
func homePageHandler(c *gin.Context) {
	queryPrograms()
	c.HTML(200, "homePage.html", queryCheckAdmin(c))
}

func adminPanelHandler(c *gin.Context) {
	admin := queryCheckAdmin(c)
	if admin {
		c.HTML(200, "adminPanel.html", admin)
	} else {
		c.Redirect(http.StatusFound, "/")
	}
}
func programPassportHandler(c *gin.Context) {
	id := c.Params.ByName("Id")
	c.HTML(200, "programPassport.html", gin.H{"Id": id, "Admin": queryCheckAdmin(c)})
}
func aboutProgramHandler(c *gin.Context) {
	id := c.Params.ByName("Id")
	c.HTML(200, "aboutProgram.html", gin.H{"fileName": queryAboutProgramFileName(id), "Admin": queryCheckAdmin(c)})
}
func adminLoginHandler(c *gin.Context) {
	c.HTML(200, "adminLogin.html", queryCheckAdmin(c))
}
func getPrograms(c *gin.Context) {
	c.JSON(200, queryPrograms())
}
func getProgram(c *gin.Context) {
	id := c.Params.ByName("Id")
	c.JSON(200, queryProgram(id))
}
func getEducations(c *gin.Context) {
	c.JSON(200, queryEducations())
}
func getListeners(c *gin.Context) {
	c.JSON(200, queryListeners())
}
func getListener(c *gin.Context) {
	type input struct {
		Id string `json:"Id"`
	}
	id := input{}
	e := c.BindJSON(&id)
	if e != nil {
		c.JSON(400, nil)
	}
	c.JSON(200, queryListener(id.Id))
}
func getParameters(c *gin.Context) {
	c.JSON(200, queryParameters())
}
func checkAdmin(c *gin.Context) {
	c.JSON(200, gin.H{
		"login": queryCheckAdmin(c),
	})
}

func addProgram(c *gin.Context) {
	type input struct {
		Title         string
		Level         string
		Type          string
		Direction     string
		Forma         string
		Size          string
		Length        string
		Price         string
		Place         string
		Min_grup_size string
		Start_date    string
		Docum         string
		Requirement   string
		Plan          string
	}

	var i input
	var program Program

	e := c.BindJSON(&i)
	if e != nil {
		c.JSON(400, nil)
		return
	}
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
	program.Start_date = i.Start_date
	program.Issued_document_id = i.Docum
	program.Requirement_id = i.Requirement
	program.Status_id = "2"
	program.Plan = i.Plan

	queryAddProgram(program)
	c.JSON(200, nil)
	c.Redirect(http.StatusFound, "/adminPanel2")
}

func createStatement(c *gin.Context) {
	idDoc := c.Params.ByName("Id")
	fileName := "../resources/templatesDocx/"
	switch idDoc {
	case "0":
		c.JSON(404, false)
		return
	case "1":
		fileName += "Заявление ДПО ПК templ.docx"
	case "2":
		fileName += "Заявление ДПО ПП templ.docx"
	case "3":
		fileName += "Заявление ПО П templ.docx"
	case "4":
		fileName += "Заявление ПО ПК templ.docx"
	case "5":
		fileName += "Заявление ПО ПП templ.docx"
	}

	var i string
	e := c.BindJSON(&i)
	if e != nil {
		utils.Logger.Println(e)
		c.JSON(400, nil)
		return
	}
	idListeners := strings.Split(i, ";")

	for _, id := range idListeners {
		listener := queryListener(id)
		listenerInformation := docx.PlaceholderMap{
			"surname":    listener.Surname,
			"name":       listener.Name,
			"patronymic": listener.Patronymic,
			"birth_date": listener.Birth_date,
			"telephone":  listener.Telephone,
			"email":      listener.Email,
			"education":  listener.Education,
			"snils":      listener.Snils,
		}

		doc, err := docx.Open(fileName)
		if err != nil {
			utils.Logger.Println(err)
			c.JSON(400, false)
		}

		err = doc.ReplaceAll(listenerInformation)
		if err != nil {
			utils.Logger.Println(err)
			c.JSON(400, false)
		}

		err = doc.WriteToFile("../resources/templatesDocx/results/" + listener.Surname + " " + listener.Name + ".docx")
		if err != nil {
			utils.Logger.Println(err)
			c.JSON(400, false)
		}
	}

	c.JSON(200, true)
}

func downloadStatement(c *gin.Context) {
	files, err := ioutil.ReadDir("../resources/templatesDocx/results/")
	if err != nil {
		utils.Logger.Println(err)

	}

	for _, file := range files {
		doc, err := docx.Open("../resources/templatesDocx/results/" + file.Name())
		if err != nil {
			utils.Logger.Println("Не получилось открыть файл"+file.Name(), err)
			c.JSON(400, nil)
		}

		c.Header("Content-Type", "application/octet-stream")
		c.Header("Content-Disposition", "attachment; filename="+file.Name())
		c.Header("Content-Transfer-Encoding", "binary")

		err = doc.Write(c.Writer)
		if err != nil {
			utils.Logger.Println(err)
			c.JSON(400, nil)
		}
		err = os.Remove("../resources/templatesDocx/results/" + file.Name())
		if err != nil {
			utils.Logger.Println(err)
		}
	}
	c.JSON(200, nil)
}
