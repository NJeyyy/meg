//Created on Saturday, 26 Feb 2022 [07:55PM] | Perum Mega Sentul Jl. Bougenville IX Kota Bogor, Indonesia
// CODE LANGUAGE IS IN JS aka JAVASCRIPT, but there's a .txt file version to this because I use it in userscript @resource and just so I could got the code by extracting it easily
// NOTE! Before it doesn't work in js format, but now its working:>

//######################################################################################################################################
function GlobalToolscript_inf(command) {
  if (command) {
    if (command.match(/help/i)) {
      console.log("Command list:\n >help -- Show Command list\n >Code_list -- Show code list of GlobalToolscript\n >Code_source -- Show URL/Link of the code source(blob) cannot be turned into raw, sadly. If you want to that, better just copy permalink from the source first");
      return;
    } else if (command.match(/Code_list/i)) {
      console.log("Code List:\n >KodeNuklir(Code, Pages, Site, Command) -- try KodeNuklir(null, null, null, \"help\") for more information about the parameter\n >pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor)\n >escapeRegex(string)\n >sleep(ms)\n >waitFor(conditionFunction)\n >evil(fn)\n >copyToClipboard(text)\n >^SE(ElementSelector)    ^ISE(ElementSelector)\n");
    } else if (command.match(/Code_source/i)) {
      console.log("GlobalToolscript source: https://github.com/NJeyyy/About-Me/blob/3fc986ad01ffe01775bddff1b18d25895f486662/ToolScript_Global.txt");
    } else {
      console.error("ERROR, The command is not available!");
    }
  } else if (!command) {
    console.error("there's no command!\n*try GlobalToolscript_inf(\"help\")!");
  }
  return;
}
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Source: .. WHAT?? You think I got this from "SOMEONE"XD.. LOL so Innocence, of course not. Beside, this is still lacking a lot of stuff~
// Buat buka kode nuklir:P BIAR GAMPANG AE
function KodeNuklir(Code, Pages, Site, Command) {
  if (Command) {
    if (Command.match(/help/i)) {
      console.log("Available command:\n -Open: Open it in new tab.\n -SiteList: Show list of site that is supported.\n -CodeExplanation: It is what it said\n -ParameterExplanation\n*YEP THAT\'S IT FOR NOW..\n**Also, FYI the cases doesn\'t matter but the text is matter!");
      return;
    } else if (Command.match(/SiteList/i)) {
      console.log("Site List:\n  >nhentai\n");
      return;
    } else if (Command.match(/CodeExplanation/i)) {
      console.log("CODE NUCLEAR EXPLANED\n    Soo.. the code I\m talking about is not an actual \"NUCLEAR\". But! A code for anime/comics/porn vid that is encrypted and shared online. There's several site for it but I only find few of it.. SADLY. Nuclear code can be found like this \"ABs-324\" or only 6 number. It depends on the site that is using it.");
      return;
    } else if (Command.match(/ParameterExplanation/i)) {
      console.log("^Code(required): The nuclear code, ITS OBVIOUS WDYM. Also THIS must BE DEFINED this was the purpose of this function..\n^Pages(Optional): It is optional, Just describe which page are you in if this was a comic and IF available\n^Site: Not must be defined, but better be but yet not really that important if your default is nhentai.net, but if it\'t not then it is required, yes it is the site you\'re using the code for\n^Command: Just some extras for this, enter \"help\" in this parameter for the code list and more information!");
      return;
    }
  }
  let cmdest = null;
  
  let URLz = null;
  URLz = Site.match(/nhentai/i)? "https://nhentai.net/g/" : "https://nhentai.net/g/";
  URLz += Code +(Pages? "/"+Pages : '');
  if (Command && Command.match(/Open/i)) {
		window.open(URLz,'_blank');cmdest = true;
  }
  if (Command && cmdest == null) {
    console.error("Looks like you insert a command that\'s not exist.")
  }
  if (Code) {return URLz;
  } else {console.error("Looks like you didn't put the code huh?");}
}



// Source: https://stackoverflow.com/a/41491220/15715476
// The name of the function, already explain it all
function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ?
    darkColor : lightColor;
}



// Source: https://stackoverflow.com/a/3561711/15715476
// Escape (with blackslash) special characters that have purpose to use in regex
function escapeRegex(string) {return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');}



// Source: https://stackoverflow.com/a/39914235/15715476
// use "sleep(N)" to use this function, it is useful to wait for certain time.
// btw just FYI "N"mean the time you needed, it is in ms btw so-- 1 sec mean 1000 miliseconds
function sleep(ms) {return new Promise(resolve => setTimeout(resolve, ms));}



// Source: https://stackoverflow.com/a/52652681/15715476
// use waitFor(conditionFunction) to wait for a certain condition to met.
//** Example:
//* >Example 1
//  async function demo() {
//    await waitFor(_ => flag === true);
//    console.log('the wait is over!');
//  }
//* Or
//* >Example 2
//  waitFor(_ => flag === true)
//    .then(_ => console.log('the wait is over!'));
//* 
//*
// Note: Yes. It must use "_ => " at the start. Cannot explain it since I don't know too rnXD
function waitFor(conditionFunction) {
  const poll = resolve => {
    if(conditionFunction()) resolve();
    else setTimeout(_ => poll(resolve), 400);
  }
  return new Promise(poll);
}



// Source: https://stackoverflow.com/a/18082175/15715476
// For Counting a string. Similar to Eval() I.. literally don't know what's the difference rn btw..
/*
function evil(fn) {return new Function('return ' + fn)();}
*/



// Source: https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
// Copy Text. or things, to clipboard.
function copyToClipboard(text) {
   const elem = document.createElement('textarea');elem.value = text;
   document.body.appendChild(elem);elem.select();
   document.execCommand('copy');
   document.body.removeChild(elem);
}



// Source: Myself HAHA
// Select Element by ElementSelector just like CSS. It's use "document.querySelector" (Individual Element) or "document.querySelectorAll" (Multiple Element).
// Depends on how you use it!
//---Grouping Mode
function SE(ElementSelector) {return document.querySelectorAll(ElementSelector).length === 0? null : document.querySelectorAll(ElementSelector);}
//---Individually Mode
function ISE(ElementSelector) {return document.querySelector(ElementSelector);}



// Source: https://thispointer.com/javascript-check-if-string-is-url/
// Check if its a valid URL or not.
function isValidUrl(_string) {
  const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
  return matchpattern.test(_string);
}



// Source: few of StackOverflow post and I combine them
// Convert Unit of Time
// Unit that convertable right now: Second, Minute, Hour
function ConvertUnitTIME(ConvertFrom, ConvertTo, SpecifiedNumber, EnableDecimal = false) {
	if (!isNaN(SpecifiedNumber)) {
		var ERRORConvertType = 'UNIT INPUT INVALID, ONLY \"Second(s)\", \"Minute(s)\", and \"Hour(s)\" are valid!\n*Cases doesnt matter tho\nNOTE: Also sorry because right now its only support min, hrs, and sec. But later on its gonna support other else like date and day!';
		if (ConvertFrom.match(/Seconds?/i)) {
			if (ConvertTo.match(/Minutes?/i)) {
				if (EnableDecimal == false) {
					if (Math.floor(SpecifiedNumber / 60)) {
						return Math.floor(SpecifiedNumber / 60);
					} else {return null;}
				} else if (EnableDecimal == true) {
					return SpecifiedNumber / 60;
				} else {
					console.error('EnableDecimal error value: only boolean are valid');
					return undefined;
				}
			} else if (ConvertTo.match(/Hours?/i)) {
				if (EnableDecimal == false) {
					if (Math.floor(SpecifiedNumber / 3600)) {
						return Math.floor(SpecifiedNumber / 3600);
					} else {return null;}
				} else if (EnableDecimal == true) {
					return SpecifiedNumber / 3600;
				} else {
					console.error('EnableDecimal error value: only boolean are valid');
					return undefined;
				}
			} else if (ConvertTo.match(/Seconds?/i)) {
				return SpecifiedNumber;
			} else {
				console.error(ERRORConvertType);
				return null;
			}
		} else if (ConvertFrom.match(/Minutes?/i)) {
			if (ConvertTo.match(/Seconds?/i)) {
				return SpecifiedNumber * 60;
			} else if (ConvertTo.match(/Hours?/i)) {
				if (EnableDecimal == false) {
					if (Math.floor(SpecifiedNumber / 60)) {
						return Math.floor(SpecifiedNumber / 60);
					}
				} else if (EnableDecimal == true) {
					return SpecifiedNumber / 60;
				} else {
					console.error('EnableDecimal error value: only boolean are valid');
					return undefined;
				}
			} else if (ConvertTo.match(/Minutes?/i)) {
				return SpecifiedNumber;
			} else {
				console.error(ERRORConvertType);
				return null;
			}
		} else if (ConvertFrom.match(/Hours?/i)) {
			if (ConvertTo.match(/Seconds?/i)) {
				return SpecifiedNumber * 3600;
			} else if (ConvertTo.match(/Minutes?/i)) {
				return SpecifiedNumber * 60;
			} else if (ConvertTo.match(/Hours?/i)) {
				return SpecifiedNumber;
			} else {
				console.error(ERRORConvertType);
				return null;
			}
		} else {
			console.error(ERRORConvertType);
			return null;
		}
	} else {
		console.error('Specified Number is not a number.\nYour Input: ' + SpecifiedNumber);
		return false;
	}
}



// Source: Pure me.
// Set Favicon of a site
function setFavicon(UrL) {
  var set_FAVICON;
  if (document.querySelector("link[rel*='icon']")) {
    set_FAVICON = document.querySelector("link[rel*='icon']");
  } else {
    set_FAVICON = document.createElement("link");
    set_FAVICON.type = "image/png";
    set_FAVICON.rel = "shortcut icon";
    document.getElementsByTagName("head")[0].appendChild(set_FAVICON);
  }
  set_FAVICON.setAttribute('href', UrL);
}



// Source: https://love2dev.com/blog/javascript-remove-from-array/#create-remove-method
// Remove element inside array defined by value
function arrayRemove(arr, value) {
  return arr.filter(function(ele){return ele != value;});
}

// Source: 1 Grepper, 2 StackOverflow Answer, and ME
// Create HTMLElement with Ease~
function CreateElm(ElmTag, ElmAttrObj, ElmInnerHTML){
	var ElmHdl;
	if((typeof ElmTag).match(/string/i)&&(!ElmAttrObj||(typeof ElmAttrObj).match(/object/i))){
		ElmHdl=document.createElement(ElmTag);
		if(ElmAttrObj){
			if(Array.isArray(ElmAttrObj)){
				ElmAttrObj.forEach(function(SObj){ElmHdl.setAttribute(Object.keys(SObj)[0], Object.values(SObj)[0]);});
			}else if(Object.keys(ElmAttrObj).length>1){
				for(var b in ElmAttrObj){ElmHdl.setAttribute(b, ElmAttrObj[b]);}
			}else{
				ElmHdl.setAttribute(Object.keys(ElmAttrObj)[0], Object.values(ElmAttrObj)[0]);
			}
		}
		if(ElmInnerHTML){ElmHdl.innerHTML=ElmInnerHTML;}
	}
	return ElmHdl;
}

// Source: https://www.educative.io/edpresso/how-to-escape-unescape-html-characters-in-string-in-javascript
// Bypass HTMLCharacter or unescape it!
function unescape_HTMLchar(strInput){return strInput.replaceAll(/&lt;/g , "<").replaceAll(/&gt;/g , ">").replaceAll(/&quot;/g , "\"").replaceAll(/&#39;/g , "\'").replaceAll(/&amp;/g , "&");}
function escape_HTMLchar(strInput){return strInput.replaceAll(/&/g, "&amp;").replaceAll(/</g, "&lt;").replaceAll(/>/g, "&gt;").replaceAll(/"/g, "&quot;").replaceAll(/'/g, "&#39;");}

// Source: https://htmldom.dev/swap-two-nodes/
// Switch HTML Element's position!!
function HTMLElm_swap(nodeA, nodeB){
	const parentA = nodeA.parentNode;
	const siblingA = nodeA.nextSibling === nodeB ? nodeA : nodeA.nextSibling;
	
	// Move `nodeA` to before the `nodeB`
	nodeB.parentNode.insertBefore(nodeA, nodeB);
	
	// Move `nodeB` to before the sibling of `nodeA`
	parentA.insertBefore(nodeB, siblingA);
}
//=============================================================================      =====================================================================================
