'use strict';

var expect = require('chai').expect;
var templatesjs = require('../index.js');

describe('#templatesjs', function() {
	
    it('should replace the <%user%> tag with "imtiaz"', function() {
		templatesjs.set("<%user%>");
        var result = templatesjs.render("user", "imtiaz");
        expect(result).to.equal('imtiaz');
    });

    it('should replace the <%user%> tag with "imtiaz"', function() {
		templatesjs.set("<%user%>");
        var result = templatesjs.render("user", "iMTiaz", "case");
        expect(result).to.equal('imtiaz');
    });

    it('should replace the <%user%> tag with "IMTIAZ"', function() {
		templatesjs.set("<%user%>");
        var result = templatesjs.render("user", "imtiaz", "CASE");
        expect(result).to.equal('IMTIAZ');
    });

    it('should replace the <%user%> tag with "Imtiaz"', function() {
		templatesjs.set("<%user%>");
        var result = templatesjs.render("user", "imtiaz","Case");
        expect(result).to.equal('Imtiaz');
    });

    it('should replace the "hello <%user.name%>" text with "imtiaz"', function() {
		templatesjs.set("hello <%user.name%>");
        var result = templatesjs.render("user", {name:"imtiaz"});
        expect(result).to.equal('hello imtiaz');
    });

    it('should replace the <%user[]%> tag with "ImtiazChowdhury"', function() {
		templatesjs.set("<%user[]%>");
        var result = templatesjs.render("user", ["Imtiaz", "Chowdhury"]);
        expect(result).to.equal('ImtiazChowdhury');
    });

    it('should replace the <%user[1]%> tag with "Chowdhury"', function() {
		templatesjs.set("<%user[1]%>")
        var result = templatesjs.render("user", ["Imtiaz", "Chowdhury"]);
        expect(result).to.equal('Chowdhury');
    });

    it('should replace the <%user[] {<span>*</span>}%> tag with "<span>Imtiaz</span><span>Chowdhury</span>"', function() {
		templatesjs.set("<%user[] {<span>*</span>}%>")
        var result = templatesjs.render("user", ["Imtiaz", "Chowdhury"]);
        expect(result).to.equal('<span>Imtiaz</span><span>Chowdhury</span>');
    });

    it('should replace the <%user[1] {<span>*</span>}%> tag with "<span>Chowdhury</span>"', function() {
		templatesjs.set("<%user[1] {<span>*</span>}%>")
        var result = templatesjs.render("user", ["Imtiaz", "Chowdhury"]);
        expect(result).to.equal('<span>Chowdhury</span>');
    });

    it('should replace the <%user[1,3]%> tag with "ChowdhuryMadihaMahboob"', function() {
		templatesjs.set("<%user[1,3]%>");
        var result = templatesjs.render("user", ["Imtiaz", "Chowdhury","Madiha", "Mahboob"]);
        expect(result).to.equal('ChowdhuryMadihaMahboob');
    });

    it('should replace the <%user[1,3] {<span>*</span>}%> tag with "<span>Chowdhury</span><span>Madiha</span><span>Mahbbob</span>"', function() {
       templatesjs.set("<%user[1,3] {<span>*</span>}%>")
	    var result = templatesjs.render("user", ["Imtiaz", "Chowdhury","Madiha", "Mahbbob"]);
        expect(result).to.equal('<span>Chowdhury</span><span>Madiha</span><span>Mahbbob</span>');
    });
    it('should replace the <%include test.txt%> tag with "templatesjs"', function() {
		templatesjs.dir = "./test/"
	   var result = templatesjs.set("<%include test.txt %>");
	   
       expect(result).to.equal('templatesjs');
    });
});
