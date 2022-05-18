package main

import (
	"learning/backend/settings"
	"net/http"

	"github.com/gin-gonic/gin"
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

	router.POST("/api/excelList", createExcelListersList)
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
