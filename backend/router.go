package main

import (
	"learning/backend/settings"
	"net/http"

	"github.com/gin-gonic/gin"
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
	router.GET("/aboutProgram", aboutProgramHandler)

	router.POST("/api/getPrograms", getPrograms)
	router.POST("/api/getProgram/:Id", getProgram)
	router.POST("/api/getEducations", getEducations)
	router.POST("/api/getListeners", getListeners)
	router.POST("/api/getListener", getListener)
	router.POST("/api/getParameters", getParameters)
	router.POST("/api/queryAddListener", queryAddListener)
	router.POST("/api/addProgram", addProgram)
	router.POST("/api/loginAdmin", queryLoginAdmin)
	router.POST("/api/checkAdmin", checkAdmin)

	router.PUT("/api/changeStatusListener", queryChangeStatusListener)
	router.PUT("/api/changeStatusProgram", queryChangeStatusProgram)
	router.PUT("/api/editListener", queryEditListener)

	router.DELETE("/api/deleteListener", queryDeleteListener)

	router.LoadHTMLGlob("../frontend/templates/*.html")
	router.Static("/resources/", "../resources")
	router.Static("/js/", "../frontend/js")
	router.Static("/css/", "../frontend/css")
	_ = router.Run(cfg.Host + ":" + cfg.Port)
}
func homePageHandler(c *gin.Context) {
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
	c.HTML(200, "aboutProgram.html", queryCheckAdmin(c))
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
	c.JSON(200, queryListener(*c))
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
	var program Program

	program.Title = c.PostForm("Title")
	program.Level_id = c.PostForm("Level")
	program.Type_id = c.PostForm("Type")
	program.Training_form_id = c.PostForm("Forma")
	program.Size = c.PostForm("Size")
	program.Length = c.PostForm("Length")
	program.Place_id = c.PostForm("Place")
	program.Direction_id = c.PostForm("Direction")
	program.Price = c.PostForm("Price")
	program.Minimum_group_size = c.PostForm("Minimum_group_size")
	program.Start_date = c.PostForm("Start_date")
	program.Issued_document_id = c.PostForm("Document")
	program.Requirement_id = c.PostForm("Requirement")
	queryAddProgram(program)
	c.Redirect(http.StatusFound, "/adminPanel")
}
