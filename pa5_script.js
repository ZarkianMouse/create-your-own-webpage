        var page = "<header><h1>ISP PA5</h1></header><main></main><footer><p>Webpage generated by NRB Software</p></footer>";
        var myWindow = null;
		var form_num = 0;
        
        function openWin() {
	    if(myWindow != null) myWindow.close();
            myWindow = window.open("", "ISP PA5", "width=800,height=168");
            myWindow.document.write(page);
            }
        
        function addButton() {
			txt_button = document.getElementsByName("txt_button")[0].value;
			loc_button = document.getElementsByName("loc_button")[0].value;
			h = page.indexOf("</"+loc_button+">");
			
			
			if (h !== -1 && txt_button !== "")
			{
				str = "<button onclick='window.open(" + "\"" + "http://www.w3schools.com/jsref/met_win_open.asp" + "\"" + ")'>"+txt_button+"</button>";
				page = page.slice(0,h) + str + page.slice(h);
				result = "<strong style=\"color:yellow\"> button added to " + loc_button+" successfully.</strong>";
			}
			if (h === -1)
			{
				
				result = "<strong style=\"color:orange\"> Error: Could not find " + loc_button + "</strong>";
				
			}
			if (txt_button === "")
				result = "<strong style=\"color:orange\">Error: Button must have a name.</strong>";
			printResult();
        }

        function addExamples() {
            page += "<button onclick='window.open(" + "\"" + "http://www.w3schools.com/jsref/met_win_open.asp" + "\"" + ")'>Examples</button>";
        }
		
		function addTag() {
			attr_add = document.getElementsByName("attr_add")[0].value;
			loc_txt = document.getElementsByName("loc_txt")[0].value;
			if (attr_add == "nav")
			{
				h = page.indexOf("</header>");
				h = h + 9;
				var str = "<nav><button onclick='window.open(" + "\"" + "http://www.w3schools.com/jsref/met_win_open.asp" + "\"" + ")'>Examples</button></nav>";
				page = page.slice(0, h) + str + page.slice(h);
			}	
			else
			{
				h = page.indexOf("<main>");
				h = h + 6;
				
				str = "<"+attr_add+"></"+attr_add+">";
				page = page.slice(0, h) + str + page.slice(h);
				
			}
			result = "<strong style=\"color:yellow\">"+ attr_add+" added successfully.</strong>";
			printResult();
			
		}
		
		function addTxt() {
			attr_txt = document.getElementsByName("attr_txt")[0].value;
			loc_txt = document.getElementsByName("loc_txt")[0].value;
			words = document.getElementsByName("words")[0].value;
			
			h = page.indexOf("</"+loc_txt+">");
			if (h !== -1 && words !== "") {
				switch(attr_txt)
				{
					case "p" : 
							var str = "<p>"+words+"</p>";
							page = page.slice(0, h) + str + page.slice(h);
								break;
					case "h2" :
							var h = page.indexOf("</"+loc_txt+">");
							var str = "<h2>"+words+"</h2>";
							page = page.slice(0, h) + str + page.slice(h);
								break;
					case "title" : 
							page += "<title>"+words+"</title>";
								break;
				
				}
				result = "<strong style=\"color: yellow\">" + attr_txt + " added successfully.</strong>";
			}
			if (h === -1)
				result = "<strong style=\"color:orange\"> Error: Could not find " + loc_txt + "</strong>";
			if (words === "")
				result = "<strong style=\"color:orange\">Error: Text area cannot be empty.</strong>";
			
			printResult();
			
		}
		
		function changeName() {
			wb_name = document.getElementsByName("wb_name")[0].value;
			if (wb_name === "")
				result = "<strong style=\"color:orange\">Error: Name field cannot be empty.</strong>";
			else
			{
				idx_start = page.indexOf("<h1>");
				idx_start += 4;
				idx_end = page.indexOf("</h1>");
				page = page.slice(0,idx_start) + wb_name + page.slice(idx_end);
				result = "<strong style=\"color: yellow\"> Webpage name successfully changed to \"" +wb_name +"\".</strong>";
			}
			
			printResult();
		}
		
		function changeWH() {
			
			// get customization values
			attr = document.getElementsByName("attr_wh")[0].value;
			wh = document.getElementsByName("wh")[0].value;
			width = document.getElementsByName("amt")[0].value;
			width_end = document.getElementsByName("width_end")[0].value;
			
			
			if (width >= 100 && width_end === "%") width = 100;
			
			// look for style tag
			style_str = "<style>";
			var idx_style = page.indexOf(style_str);
			
			// look for attribute to be styled
			attr_str = attr +" { ";
			var idx_attr = page.indexOf(attr_str);
			if (width === "")
				result = "<strong style=\"color:orange\">Error: Number field cannot be empty.</strong>";
			if (idx_style !== -1 && idx_attr !== -1)
			{
				// if style tag and attribute style field available, look for customization field
				idx_attr = idx_attr + attr_str.length;	// move up attr index
				mp_str = page.slice(idx_attr); // set new search string
				idx_end = mp_str.indexOf("}"); // look for end of attribute field
				mp_str = mp_str.slice(0,idx_end); // set search string to this
				change_str =  wh+":"; // set customization to add
				idx_mp = mp_str.indexOf(change_str); // look for if customization field exists
				
				if (idx_mp !== -1) {
					// if customization field exists, change value
					idx_mp = idx_mp + change_str.length; // move up custom index
					end_str = page.slice(idx_attr+idx_mp); // set new search string
					idx_change = end_str.indexOf(";"); // look for end of line
					
					// add customization
					page = page.slice(0,idx_attr+idx_mp)+width+width_end+page.slice(idx_attr+idx_mp+idx_change);
				}	
				else 
				{
					// if customization field does not exist, add it to attribute field now
					my_str = change_str+width+width_end+"; ";
					page = page.slice(0,idx_attr)+my_str+page.slice(idx_attr);
				}
			}
			else if (idx_style !== -1 && idx_attr === -1)
			{
				// if style tag exists, but no attribute field set, add it now
				page = page.slice(0,idx_style+7)+" "+attr+" { "+wh+":"+width+width_end+";}" + page.slice(idx_style+7);
			}
			else
			{
				// if no style tag exists, add style tag and attribute field now (first style of the session)
				page += "<style>"+attr+" { "+wh+":"+width+width_end+";}</style>";
			}
			
			if (width !== "")
				result = "<strong style=\"color: yellow\">"+attr+" "+wh+" changed to "+width+width_end+"</strong>";
			printResult();
		}
		
		function changeMP() {
			
			// get customization values
			
			attr = document.getElementsByName("attr_mp")[0].value;
			mp = document.getElementsByName("mp")[0].value;
			m_lft = document.getElementsByName("lft")[0].value;
			m_rgt = document.getElementsByName("rgt")[0].value;
			m_top = document.getElementsByName("top")[0].value;
			m_btm = document.getElementsByName("btm")[0].value;
			
			
			// look for style tag
			style_str = "<style>";
			var idx_style = page.indexOf(style_str);
			
			// look for attribute to be styled
			attr_str = attr +" { ";
			var idx_attr = page.indexOf(attr_str);
			
			
			if (idx_style !== -1 && idx_attr !== -1 )
			{
				// if style tag and attribute style field available, look for customization field
				idx_attr = idx_attr + attr_str.length;	// move up attr index
				mp_str = page.slice(idx_attr); // set new search string
				idx_end = mp_str.indexOf("}"); // look for end of attribute field
				mp_str = mp_str.slice(0,idx_end); // set search string to this
				change_str =  mp + "-left:"; // set customization to add
				idx_mp = mp_str.indexOf(change_str); // look for if customization field exists
				
				if (idx_mp !== -1) {
					// if customization field exists, change value
					idx_mp = idx_mp + change_str.length; // move up custom index
					end_str = page.slice(idx_attr+idx_mp); // set new search string
					idx_change = end_str.indexOf(";"); // look for end of line
					
					// add customization
					page = page.slice(0,idx_attr+idx_mp) + m_lft + page.slice(idx_attr+idx_mp+idx_change);
					
					change_str = mp + "-right:";
					mp_str = page.slice(idx_attr); // set new search string
					idx_end = mp_str.indexOf("}"); // look for end of attribute field
					mp_str = mp_str.slice(0,idx_end); // set search string to this
					idx_mp = mp_str.indexOf(change_str); // look for if customization field exists
					
					idx_mp = idx_mp + change_str.length; // move up custom index
					end_str = page.slice(idx_attr+idx_mp); // set new search string
					idx_change = end_str.indexOf(";"); // look for end of line
					
					// add customization
					page = page.slice(0,idx_attr+idx_mp)+ m_rgt + page.slice(idx_attr+idx_mp+idx_change);
					
					change_str = mp + "-top:";
					mp_str = page.slice(idx_attr); // set new search string
					idx_end = mp_str.indexOf("}"); // look for end of attribute field
					mp_str = mp_str.slice(0,idx_end); // set search string to this
					idx_mp = mp_str.indexOf(change_str); // look for if customization field exists
					
					idx_mp = idx_mp + change_str.length; // move up custom index
					end_str = page.slice(idx_attr+idx_mp); // set new search string
					idx_change = end_str.indexOf(";"); // look for end of line
					
					// add customization
					page = page.slice(0,idx_attr+idx_mp)+ m_top + page.slice(idx_attr+idx_mp+idx_change);
					
					change_str = mp + "-bottom:";
					mp_str = page.slice(idx_attr); // set new search string
					idx_end = mp_str.indexOf("}"); // look for end of attribute field
					mp_str = mp_str.slice(0,idx_end); // set search string to this
					idx_mp = mp_str.indexOf(change_str); // look for if customization field exists
					
					idx_mp = idx_mp + change_str.length; // move up custom index
					end_str = page.slice(idx_attr+idx_mp); // set new search string
					idx_change = end_str.indexOf(";"); // look for end of line
					
					// add customization
					page = page.slice(0,idx_attr+idx_mp)+ m_btm + page.slice(idx_attr+idx_mp+idx_change);
				}	
				else 
				{
					// if customization field does not exist, add it to attribute field now
					my_str = "display: box; "+change_str+ m_lft +"; " +mp+"-right:"+m_rgt+"; "+mp+"-top:"+ m_top+"; "+mp+"-bottom:"+m_btm+"; ";
					page = page.slice(0,idx_attr)+my_str+page.slice(idx_attr);
				}
			}
			else if (idx_style !== -1 && idx_attr === -1)
			{
				// if style tag exists, but no attribute field set, add it now
				page = page.slice(0,idx_style+7)+" "+attr+" { display: box; "+mp+"-left:"+m_lft +"; " +mp+"-right:"+m_rgt+"; "+mp+"-top:"+ m_top+"; "+mp+"-bottom:"+m_btm+";}" + page.slice(idx_style+7);
			}
			else
			{
				// if no style tag exists, add style tag and attribute field now (first style of the session)
				page += "<style>"+attr+" { display: box; "+mp+"-left:"+m_lft +"; " +mp+"-right:"+m_rgt+"; "+mp+"-top:"+ m_top+"; "+mp+"-bottom:"+m_btm+";}</style>";
			}
			
			result = "<strong style=\"color: yellow\">"+attr+" "+mp+
						" changed to:<br> left: "+m_lft+", right: "+m_rgt+", top: "+m_top+", bottom: "+m_btm+"</strong>";
			printResult();
		}
		
		function changeBorder() {
			
			// get customization values
			attr_border = document.getElementsByName("attr_border")[0].value;
			border_style = document.getElementsByName("border_style")[0].value;
			border_color = document.getElementsByName("border_color")[0].value;
			border_width = document.getElementsByName("border_width")[0].value;
			
			// look for style tag
			style_str = "<style>";
			var idx_style = page.indexOf(style_str);
			
			// look for attribute to be styled
			attr_str = attr_border+" { ";
			var idx_attr = page.indexOf(attr_str);
			
			
			if (idx_style !== -1 && idx_attr !== -1 )
			{
				// if style tag and attribute style field available, look for customization field
				idx_attr = idx_attr + attr_str.length;	// move up attr index
				border_str = page.slice(idx_attr); // set new search string
				idx_end = border_str.indexOf("}"); // look for end of attribute field
				border_str = border_str.slice(0,idx_end); // set search string to this
				change_str =  "border:"; // set customization to add
				idx_border = border_str.indexOf(change_str); // look for if customization field exists
				
				if (idx_border !== -1) {
					// if customization field exists, change value
					idx_border = idx_border + change_str.length; // move up custom index
					end_str = page.slice(idx_attr+idx_border); // set new search string
					idx_change = end_str.indexOf(";"); // look for end of line
					
					// add customization
					page = page.slice(0,idx_attr+idx_border)+border_width + " " + border_style + " " + border_color+page.slice(idx_attr+idx_border+idx_change);
				}	
				else 
				{
					// if customization field does not exist, add it to attribute field now
					my_str = change_str+border_style + " " + border_width + " " + border_color+"; ";
					page = page.slice(0,idx_attr)+my_str+page.slice(idx_attr);
				}
			}
			else if (idx_style !== -1 && idx_attr === -1)
			{
				// if style tag exists, but no attribute field set, add it now
				page = page.slice(0,idx_style+7)+" "+attr_border+" { border:"+border_width+" "+border_style+" "+ border_color+";}" + page.slice(idx_style+7);
			}
			else
			{
				// if no style tag exists, add style tag and attribute field now (first style of the session)
				page += "<style>"+attr_border+" { border:"+border_width +" "+border_style+" "+border_color+";}</style>";
			}
			
			result = "<strong style=\"color: yellow\">"+attr_border+" border changed to: "+border_width +" "+ border_style+" "+border_color+"</strong>";
			printResult();
			
		}
		
		function changeColor() {
			attr_color = document.getElementsByName("attr_color")[0].value;
			txt_color = document.getElementsByName("txt_color")[0].value;
			color = document.getElementsByName("my_color")[0].value;
			
			style_str = "<style>";
			attr_str = attr_color+" { ";
			change_str = " "+txt_color+":";
			idx_style = page.indexOf(style_str);
			idx1 = page.indexOf(attr_str);
			if (idx_style !== -1 && idx1 !== -1 )
			{
				idx1 = idx1 + attr_str.length;
				str2 = page.slice(idx1);
				
				idx_end = str2.indexOf("}");
				str2 = str2.slice(0,idx_end);
				idx2 = str2.indexOf(change_str);
				
				if (idx2 !== -1)
				{
					str3 = page.slice(idx1+idx2);
					idx3 = str3.indexOf(";");
					page = page.slice(0,idx1)+color+page.slice(idx1+idx2+idx3);
				}
				else 
				{
					page = page.slice(0,idx1)+change_str +color+";"+page.slice(idx1);
				}
				
			}
			else if (idx_style !== -1 && idx1 === -1)
			{
				page = page.slice(0,idx_style+7)+attr_str+change_str+color+";}"+page.slice(idx_style+7);
			}
			else
				page += "<style>"+attr_color+" { "+txt_color+":"+color+";}</style>";
			
			result = "<strong style=\"color: yellow\">"+attr_color + " " + txt_color + " changed to " + color +"</strong>";
			printResult();
		}
		
		
		function selectOpt(ref,mp_opt){
			org_list=document.getElementById(ref);
			org_list.selectedIndex=org_list.querySelector('option[value="'+mp_opt+'"]').index;
		}
		
		function changeAlignment() {
			attr = document.getElementsByName("attr_align")[0].value;
			align = document.getElementsByName("align")[0].value;
			
			txt_align = "text-align";
			style_str = "<style>";
			attr_str = attr+" { ";
			change_str = " "+txt_align+":";
			idx_style = page.indexOf(style_str);
			idx1 = page.indexOf(attr_str);
			if (idx_style === -1)
			{
				page += "<style>"+attr+" { "+txt_align+":"+align+";}</style>";
			}
			else if (idx1 === -1)
			{
				page = page.slice(0,idx_style+7)+attr_str+change_str+align+";}"+page.slice(idx_style+7);
			}
			else
			{
				idx1 = idx1 + attr_str.length;
				str2 = page.slice(idx1);
				
				idx_end = str2.indexOf("}");
				str2 = str2.slice(0,idx_end);
				idx2 = str2.indexOf(change_str);
				
				if (idx2 !== -1)
				{
					str3 = page.slice(idx1+idx2);
					idx3 = str3.indexOf(";");
					page = page.slice(0,idx1)+align+page.slice(idx1+idx2+idx3);
				}
				else 
				{
					page = page.slice(0,idx1)+change_str +align+";"+page.slice(idx1);
				}
				
			}
				
			result = "<strong style=\"color: yellow\"> designated "+attr + " text alignment changed to " + align+"</strong>";
			printResult();
		}
		
		
		// Reference: https://www.dyn-web.com/tutorials/forms/select/multi-selected.php
		// arguments: reference to select list, callback function (optional)
		function getSelectedOptions(sel) {
			var opts = [], opt;
			
			// loop through options in select list
			for (var i=0, len=sel.options.length; i<len; i++) {
				opt = sel.options[i];
				
				// check if selected
				if ( opt.selected ) {
					// add to array of option elements to return from this function
					opts.push(opt);
				}
			}
			
			// return array containing references to selected option elements
			return opts;
		}
		
		document.getElementById('form_add').onsubmit = function(e) {
	
			var opts = getSelectedOptions( this.elements['attr_form[]'] );

			loc_form = document.getElementsByName("loc_form")[0].value;
			name_form = document.getElementsByName("name_form")[0].value;
			
			h = page.indexOf("</"+loc_form+">");
			
			if (h !== -1 && name_form !== "" && opts.length > 0)
			{
				name = name_form+form_num;
				name = name.replace(/\s/g,'');
				var form_build = "<form \" id=\""+name+"\" action=\"\\~nrb74\\pa5\\hi.php\" method=\"post\" target=\"_blank\"><fieldset><legend>"+name_form+"</legend>";
				for (var i = 0; i < opts.length; i++)
				{
					elem = opts[i].value;
					
					switch(opts[i].value) {
						case "name" : form_build += elem + ": <input type=\"text\" name=\""+ elem + "\" value=\"\"><br>";
									break;
						case "email" : form_build += elem + ": <input type=\""+elem+"\" name=\""+ elem+ "\" value=\"\"><br>";
									break;
						case "phone" : form_build += elem + ": <input type=\"tel\" name=\""+ elem + "\" pattern=\"[0-9]{3}-[0-9]{3}-[0-9]{4}\"><br>"
												+ "(phone number format: xxx-xxx-xxx) <br>";
									break;
						case "color" : form_build += elem + ": <input type=\"color\" name=\""+ elem + "\"><br>";
									break;
						case "textarea" : form_build += "<textarea name=\""+elem+"\" rows=\"5\" cols=\"20\"></textarea><br>";
									break;
						default : form_build += "<input type=\"text\" name=\"text\" value=\"\"><br>";
									elem = "text";
									break;
					}
				}
				form_build += "<input type=\"submit\" value=\"submit\"></fieldset></form>";
								
				page = page.slice(0,h) + form_build + page.slice(h);
				
				result = "<strong style=\"color: yellow\">" + name_form + " added successfully.</strong>";
			}
			if (opts.length === 0)
				result = "<strong style=\"color:orange\">Error: No form options selected</strong>";
			if (h === -1)
				result = "<strong style=\"color:orange\"> Error: Could not find " + loc_form + "</strong>";
			if (name_form === "")
				result = "<strong style=\"color:orange\">Error: Form must have a name</strong>";
			
			printResult();
			++form_num;
			return false;
    
		};
		
		function printResult() {
			document.getElementById("result").innerHTML = result;
		}
        
		function printDebug() {
			document.getElementById("debug").innerHTML = debug;
		}
		
        function closeWindow() {
            myWindow.close();
        }
 
        function reference() {
            window.open("http://www.w3schools.com/jsref/obj_window.asp");
        }
        
        function examples() {
            window.open("http://www.w3schools.com/jsref/met_win_open.asp");
        }