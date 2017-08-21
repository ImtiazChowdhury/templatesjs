#						templatesjs




[![Build Status](https://travis-ci.org/ImtiazChowdhury/templatesjs.svg?branch=master)](https://travis-ci.org/ImtiazChowdhury/templatesjs)
[![node](https://img.shields.io/badge/Node-=>4.0.0-brightgreen.svg)]()
[![Dependencies](https://img.shields.io/badge/Dependencies-none-brightgreen.svg)]()
[![npm](https://img.shields.io/npm/v/templatesjs.svg)]()

[![npm](https://img.shields.io/npm/l/templatesjs.svg)]()
[![npm](https://img.shields.io/npm/dw/templatesjs.svg)]()


Render dynamic data to your template without any engine.
A pure javascript module without any dependency and further installation.

It works using simple javascript functions, high speedy and easy to use.
works with any file format including HTML. you can also include another files in your file using include()
	
## table of contents:


- [Install](#installation)
- [Usage](#usage)

    - [Render string](#how-to-render-string)
    - [Render object](#how-to-render-value-of-object)
    - [Render array](#how-to-render-specific-index-value-of-an-array)
    - [Loop through array](#how-to-render-all-values-looping-through-the-whole-array)
    - [Loop through specific array indexes](#how-to-render-all-values-looping-through-some-specific-index-of-array)
    - [Specify format of output](#how-to-specify-format-of-output)
    - [UPPERCASE, Capitalized, lowercase output](#specify-case)
    - [Include files](#include-another-file-inside-a-file-or-data)
    - [Set default directory](#set-default-directory-for-files)
    - [Change delimiter](#change-the-delimiter-sign)
    - [Shorthands for functions](#shorthands-for-functions)
    - [Demonstration](#demonstration-with-javascript-on-client-side)


## Installation

  ```sh
$ npm install templatesjs
```

  
  
  
 
## Usage


## How to render string

for examples below we will be rendering dynamic data to a HTML page

in our html page we must use a tag to call data , a templatesjs tag looks like <%keyword%> 

**note: you can change the delimiter that defines the tag (%) **
	
	examle HTML(index.html)
```html
	<!DOCTYPE HTML>
	<html>
	<head>
		<title>TemplatesJS Demonstration</title>
	</head>
	<body>
		HELLO <%user %>
	</body>
	</html>
```
	
here we will replace the `<%user%>` tag with John Doe;
	
`in node.js file`
	
```js 
	var templatesjs = require('templatesjs');
	
	fs.readFile("./index.html", function(err,data){
		if(err) through err
		
		/*you must set data once for each file, templatesjs works 
		with the given data, not with the actual file;*/
		
		templatesjs.set(data);		
		
		var output = templatesjs.render("user", "John Doe");
		res.write(output);
		res.end();
		
	});
```
	
	
this will print `"HELLO John Doe"` on the browser instead of `hello <%user%>`
	
## How to render value of object
we can also render array or object value as
	
	
```html
	<body>
		HELLO <%user.name%>
	</body>
	
```
`in node.js file`
```js
	var data = fs.readFileSync("./index.html");
	templatesjs.set(data);
	var profile = {name:"John Doe",age:"18"};
	var output = templatesjs.render("user", profile);
	
```
this will print "HELLO John Doe"

	
## How to render specific index value of an array
	
for array:
	
	
```html
	<body>
		HELLO <%user[0]%>
	</body>
	
```
`in node.js file`
	
```js
	var data = fs.readFileSync("./index.html");
	templatesjs.set(data);
	var profile =["John Doe", "18"];
	var output = templatesjs.render("user", profile);
	
```
this will print `"HELLO John Doe"`
	
	
## How to render all values looping through the whole array
	
or all values of an array :
	
```html
	<body>
		HELLO <%user[]%>
	</body>
	
```
`in node.js file`
```js
	var data = fs.readFileSync("./index.html");
	templatesjs.set(data);
	var profile =["John Doe", "18"];
	var output = templatesjs.render("user", profile);
	
```
this will print `"HELLO John Doe18"`
	
	
## How to render all values looping through some specific index of array
	
all array values starting from an index to another one
	
```html
	<body>
		HELLO <%user[2,5]%> 
		
		<!-- 
		**in the bracket the first number indicates the index 
		**from where the values should start and the
		** second one indicates the index of stopping point
		-->
		
	</body>
	
```
`in node.js file`
```js
	var data = fs.readFileSync("./index.html");
	templatesjs.set(data);
	var profile =["John", "Doe", "18", "hello", "world", "JS"];
	var output = templatesjs.render("user", profile);

```
this will print `"18helloworldJS"`
	
	
## How to specify format of output
	
suppose that we want a for each loop through our array values 
using templatesjs it can be done like
	
```html
	<body>
	
		<%user[] {<a href="user/*">*</a>}%>  
		<!--
			**specify the format in curly braces
			** all "*" sign will be replaced by the actual
			**value with the format specified around it
		-->
		
	</body>
	
	
```
`in node.js file`
```js
	var data = fs.readFileSync("./index.html");
	templatesjs.set(data);
	var profiles =["John", "Doe"]
	var output = templatesjs.render("user", profiles)
	
```
output : `<a href="user/John">John</a> <a href="user/Doe">Doe</a> `
	
	

for a loop through specified indexes of an array in specified format
```html
	<body>
	
		<%user[2,4] {<a href="user/*">*</a>}%>  
		
	</body>
	
```
`in node.js file`
```js
	var data = fs.readFileSync("./index.html");
	templatesjs.set(data);
	var profiles =["John", "Doe", "foo", "bar", "example"]
	var output = templatesjs.render("user", profiles)

```
output : `<a href="user/foo">foo</a>  <a href="user/bar">bar</a>  <a href="user/example">ecample</a> `
	
	
	
	
	or specify format for only one array index if you want
```html
<body>
		<%user[2] {<a href="user/*">*</a>}%>  
		
	</body>
	
	
```
`in node.js file`
```js
	var data = fs.readFileSync("./index.html");
	templatesjs.set(data);
	var profiles =["John", "Doe", "foo", "bar", "example"]
	var output = templatesjs.render("user", profiles)
	
```
output : `<a href="user/foo">foo</a>`
	
	
	
## Specify case

**specify output to be UPPERCASE or Capitalized or lowercase**
	
you can specify whether the output will be in UPPERCASE, lowercase, Capitalized using a third optional `"case"` param 
in the `templatesjs.render()` function
	
the case param supports three values "CASE", "Case", or "case"
* `"CASE"` : for UPPERCASE output;
* `"Case"` : for Capitalized output
* `"case"` : for lowercase output
	
```html
	<body>
	
	UPPERCASE: <%uUser%>;
	Capitalized: <%cUser%>;
	lowercase: <%lUser%>;
		
	</body>
	
```
`in node.js file`
```js
	var data = fs.readFileSync("./index.html");
	templatesjs.set(data);
	var output = templatesjs.render("uUser", "john", "CASE") 
	// "CASE" for UPPERCASE output
	
	output = templatesjs.render("cUser", "doE", "Case") 
	// "Case" for Capitalized output
	
	output = templatesjs.render("user", "SMith", "CASE") 
	// "case" for lowercase output
	
```
output : `UPPERCASE: JOHN `;
		`Capitalized: Doe`;
		`lowercase: smith`;
	
	
## Include another file inside a file or data
	
templatesjs also has an include feature which can be used 
to include file or template parts just use the `<%include%>` tag in your file 
```html
	<body>
	
		<%include header.html%>
		
		<h3>Header is above</h3>
		
		<h1>content goes here : </h1>
		<%include posts/content.html%> 
		// the file is in ./post/ directory you can also 
		//use templatesjs.dir variable to set default
		
		<h2>footer is below</h2>
		
		<%include footer.html%>
		
	</body>
	
```
	
no need to render  anything in the node.js file, the files 	will be rendered 
automatixally when you set data using `templatesjs.set()` function;
	
	
	
	
	
## Set default directory for files

**set default directory**:
	
	
before you set data for templatesjs using the `templatesjs.set()` function you can set the default directory where templatesjs will
look for files it needs to include ;
	
suppose that we have all our html files in the "public" directory 
	

`in node.js file`
```js
	 var templatesjs = require('templatesjs');
	 
	 templatesjs.dir = "./public/" // this is just a variable ;
	 
	 templatesjs.set("/*you data goes here*/");
```
	
	
## Change the delimiter sign
	
**Don't like to use the "%" sign to define tags in html page you can change them :D :D :D** 
use the templatesjs.delim() function
	
`in node.js file`
```js
	
	
	var templatesjs = require('templatesjs');
	templatesjs.delim("$") 
	// you can use any sign like ["!@#$%^&*"] or 
	//any combination like "#@" or "%$" or "*&" or "*!" 
```
	
## Shorthands for functions
	

are function names too long? there are shorthands availabe :D :D :D 
	
functions can also be used as :
	
* **set()**    :                      `s()`
* **set()**    :                      `setData()`
* **set()**    :                     `sd()`
* **set()**    :                    `setdata()`
	
* **render()** :                   `ren()`
* **render()** :                  `r()`
* **render()** :                   `rn`
	
* **delim()**  :                    `delimier()`
* **delim()**  :                    `del(`
* **delim()**  :                     `d()`
	
	
## Demonstration with javascript on client side
 
	
**just have a look through the following code snippet**:
```html
						<!--[index.html]-->
		<body>
		
			Welcome <span id="username"></span>
			your Email <span id="email"></span>
			your report : <%include report.txt%>
			
			
			<script type="text/javascript">
			
				var user = <%user%>;
				for( x in user){
					document.body.innerHTML+=x;
				}
				
				var profile = <%profile%>;
				
				document.getElementById("username").innerHTML = profile.name;
				document.getElementById("email").innerHTML = profile.email;
				
				
			</script>
		</body>
	
```
`in node.js file`
```js
						//[index.js]
						
	var templatesjs = require('templatesjs');
	var fs = require('fs');
	var http = require('http');
	
	http.crateServer(function(req,res){
		fs.readFile("./public/index.html", function(err,data){
			if(err) throw err;
			templatesjs.dir = "./public/"
			templatesjs.set(data)
			
			var users=["John", "Doe", "Smith"];
			var output = templatesjs.ren("user",users);
			
			var profile = {name:"John Doe", email:"JohnDoe@smith.com"}
			output = templatesjs.ren("profile", profile);
			
			res.write(output);
			res.end()
			
		});
	}).listen(8080);
```


Thank You for having a look through.
Hope you enjoy coding with templatesJS.
