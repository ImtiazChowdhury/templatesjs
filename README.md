#						templatesjs



### Render dynamic data to your template.

[![Build Status](https://travis-ci.org/ImtiazChowdhury/templatesjs.svg?branch=master)](https://travis-ci.org/ImtiazChowdhury/templatesjs)
[![node](https://img.shields.io/badge/Node-=>4.0.0-brightgreen.svg)]()
[![Dependencies](https://img.shields.io/badge/Dependencies-none-brightgreen.svg)]()
[![npm](https://img.shields.io/npm/v/templatesjs.svg)]()

[![npm](https://img.shields.io/npm/l/templatesjs.svg)]()
[![npm](https://img.shields.io/npm/dw/templatesjs.svg)]()

## Features

* **Output data with <%%>**
* **Output String, Array, Object.property**
* **Format Output**
* **UPPERCASE, Capitalized, Lowercase Output**
* **Include**
* **Custom delimiters (e.g., use <# #> instead of <% %>)**

	
## Table of contents:


- [Install](#installation)
- [Usage](#usage)

    - [Render string](#string)
    - [Render object](#object)
    - [Render array](#array)
    - [Loop through array](#loop-through-array)
    - [Loop through specific array indexes](#loop-through-specific-index-of-array)
	- [Specify format of output](#format-of-output)
	- [UPPERCASE, Capitalized, lowercase output](#specify-case)
	- [Include files](#include-file)
	- [Set default directory](#set-default-directory)
	- [Change delimiter](#delimiter-sign)
	- [Shorthands for functions](#shorthands-for-functions)
	- [Demonstration](#demonstration-with-javascript-on-client-side)
- [Test](#test)

## Installation

  ```sh
$ npm install templatesjs
```

### Using git 
 
  ```sh
  $ git clone https://github.com/ImtiazChowdhury/templatesjs.git
 ```
 
# Usage  

####Example html : 
```html 

	<body>
		Hello <%name%>
	</body>
	

```
####node.js
```js
	
	temp.render("name", "John Doe");
	
```

####Output : 
    Hello John Doe
    
## string
Use <% %> to use rendered data in HTML page
	
	examle HTML(index.html)
	
```html
	<!DOCTYPE HTML>
	<html>
	<body>
		HELLO <%firstname%> <%lastname%>
	</body>
	</html>
```
	
here we will replace the `<%user%>` tag with John Doe;
	
`in node.js file`
	
```js 
	var templatesjs = require('templatesjs');
	fs.readFile("./index.html", function(err,data){
		if(err) through err
		
		templatesjs.set(data);	//set the data to modify
		
		var output = templatesjs.render("firstname", "John");
		output = templatesjs.render("lastname", "Doe");
		res.write(output);
		res.end();
		
	});
```
	
	
this will print `"HELLO John Doe"` on the browser instead of `hello <%user%>`

templatesjs work with the data you set using set(). It modifies the data and returns the modified data.  
It will all `<%firstname%>` tags in the data with "John" and return the data.
	
## object
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

Templatesjs won't render the object `profile` to the page,   
it will only relace the `<%user.name%>` with the `name` property of `profile` object.
	
## array
	
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
	
	
## loop through array
	
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
	
	
## loop through specific index of array
	
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

A loop will be performed which will start form `user[2]` and finish on `user[5]'.
No whitespace will be added before or after the values.
	
## format of output
	
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
	
A loop will be performed and values will be added inside the specified format  
replacing all "*" with actual value. I foyu want a Linebreak at the end of every link  
you must specify the format as `{<a href="user/*">*</a> <br />}` 

#### for a loop through specified indexes of an array in specified format
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
	
	
	
	
#### or specify format for only one array index if you want
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
	
you can specify whether the output will be in UPPERCASE, lowercase, Capitalized using a third optional `"style"` param 
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

Any value for the style parameter other than "CASE", "Case" or "case" will produce an error message on the console  
and consider the value of style as undefined.
	
## Include file
	
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
	
The `include` function gets invoked when you set the data for template.
It will look for every file specified inside <%inlude %> tag and replace the tag with Data read from those files.
Because include is performed at the very beginning **you can render data inside those included files as well**

If the file is not found it will replace the <%include %> tag with "". Without causing any error.
You can set `teplatesjs.logErr` to `true` if you want a "File Not Found!" error in the output.
	
## Set default directory

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
the default directory (if needed to be set) must be set before setting the data using `ste()`. 

## delimiter sign
	
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
* **delim()**  :                    `del()`
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
	templatesjs.dir = "./public/"
	http.crateServer(function(req,res){
		fs.readFile("./public/index.html", function(err,data){
			if(err) throw err;
			
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

#### for each view you want to render set data once. 

## Test

```sh
   $ npm test
```
Please Report any bug or issue on https://github.com/ImtiazChowdhury/templatesjs/issues.

Thank You for having a look through.
Hope you enjoy coding with templatesJS.
