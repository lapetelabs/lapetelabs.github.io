//Disable right click
var message="";
///////////////////////////////////
function clickIE() {if (document.all) {(message);return false;}}
function clickNS(e) {if 
(document.layers||(document.getElementById&&!document.all)) {
if (e.which==2||e.which==3) {(message);return false;}}}
if (document.layers) 
{document.captureEvents(Event.MOUSEDOWN);document.onmousedown=clickNS;}
else{document.onmouseup=clickNS;document.oncontextmenu=clickIE;}

document.oncontextmenu=new Function("return false")

//Thumbs Roll Over Effect
function fadeIn(ID){
	var divID = ID.replace("thumb",'div');
	document.getElementById(ID).style.opacity = .75;
	document.getElementById(ID).style.filter = 'alpha(opacity=75)';
	document.getElementById(divID).style.background = '#a07224';
}

function fadeOut(ID){
	var divID = ID.replace("thumb",'div');
	document.getElementById(ID).style.opacity = .25;
	document.getElementById(ID).style.filter= 'alpha(opacity=25)';
	document.getElementById(divID).style.background = '';
}

//Switch Main Image
function loadGallery(imageFile,currentThumb,thumbCount,photographer,title,description,price){
	var thumbChange = "";
	var pictureID = 'gallery_main_photo_id';
	thumbCount = parseInt(thumbCount);
	var divID = '';
	for (var i=1; i<= thumbCount; i++){
		thumbChange = "thumb" + i;
		divID = "div" + i;
		if (thumbChange != currentThumb){
			document.getElementById(thumbChange).style.opacity = .25;
			document.getElementById(thumbChange).style.filter= 'alpha(opacity=25)';
			document.getElementById(thumbChange).onmouseover =  function onmouseover(event) {fadeIn(this.id);};
			document.getElementById(thumbChange).onmouseout =  function onmouseout(event) {fadeOut(this.id);};
			document.getElementById(divID).style.background = '';
		} else{
			document.getElementById(thumbChange).onmouseover = "";
			document.getElementById(thumbChange).onmouseout = "";
			document.getElementById(thumbChange).style.opacity = 1.0;
			document.getElementById(thumbChange).style.filter= 'alpha(opacity=100)';
			document.getElementById('photoCount').innerHTML = '('+ i + '/' + thumbCount + ')';
			document.getElementById(divID).style.background = '';
		}
	}
	loadImage(imageFile);
	loadPhotoCopy(photographer,title,description,price);
}

function loadImage(imageFile,photographer)  {
		document.getElementById('gallery_main_photo').innerHTML = '<table width="776" height="450" border="0" cellpadding="0" cellspacing="0"><tr><td valign="middle"><img src="'+imageFile+'" id="gallery_main_photo_id" /></td></tr></table>';
}
function loadPhotoCopy(photographer,title,description,price){
	var photoCopy = '';
	if(title != ''){
		photoCopy = photoCopy+'"'+decodeURIComponent(title)+'" ';
	}
	if(description != ''){
		photoCopy = photoCopy+'- '+decodeURIComponent(description)+" ";	
	}
	if(price != ''){
		photCopy = photoCopy+decodeURIComponent(price);	
	}
	photoCopy = photoCopy+'&copy; '+decodeURIComponent(photographer);
	document.getElementById('photographer').innerHTML = photoCopy;	
}

//Move Thumbs
function slideRight(count){
	count = parseInt(count);
	count = count - 7;
	position = document.getElementById('gallery_thumbs').style.left;
	position = position.replace(/px/,'');
	position = parseInt(position);
	if (position > (-101 * (count))) {
		document.getElementById('gallery_thumbs').style.left = (position-102) + "px";
	}
}

function slideLeft(){
	var _moLeftArrow = document.getElementById('left');
	var _moRightArrow = document.getElementById('right');
	
	position = document.getElementById('gallery_thumbs').style.left;
	position = position.replace(/px/,'');
	position = parseInt(position);
	if(position<0){
		document.getElementById('gallery_thumbs').style.left = (position+102) + "px";
	}
}

//Load New Category
function loadNewCategory(category,count){
	count = parseInt(count);
	for(var i=0; i<count; i++){
		cat = 'cat' + (i+1);
		var spanChange = document.getElementById(cat);
		spanChange.style.color = '#636363';
	}
	var currentCats = document.getElementById('gallery_categories').innerHTML;
	document.getElementById('gallery_body').innerHTML = '<div id="gallery_main_photo"><table width="776" style="height:450px" border="0" cellpadding="0" cellspacing="0"><tr><td valign="middle" align="center">Loading ...</td></tr></table></div><div id="photographer">&nbsp;</div><div id="gallery_categories">'+ currentCats +'</div><div id="gallery_nav"><img src="../images/gallery/nav/left_u.jpg" name="left" border="0"/><div id="gallery_thumb_holder"><div id="gallery_thumbs"></div></div><img src="../images/gallery/nav/right_u.jpg" name="right" border="0"/></div></div>';
	xmlhttp=GetXmlHttpObject();
	if (xmlhttp==null){
	  alert ("Browser does not support HTTP Request");
	  return;
	 }
	var url="categoryLoad.php";
	url=url+"?category="+category;
	xmlhttp.onreadystatechange=stateChanged;
	xmlhttp.open("GET",url,true);
	xmlhttp.send(null);
}

function stateChanged(){
	if (xmlhttp.readyState==4){
		document.getElementById("gallery_body").innerHTML=xmlhttp.responseText;
	}
}

function GetXmlHttpObject(){
	if (window.XMLHttpRequest){
		  // code for IE7+, Firefox, Chrome, Opera, Safari
		  return new XMLHttpRequest();
	  }
	if (window.ActiveXObject){
		// code for IE6, IE5
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
	return null;
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

//Rollover Functions
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}
