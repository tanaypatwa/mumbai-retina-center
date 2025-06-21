fixMozillaZIndex=true; //Fixes Z-Index problem  with Mozilla browsers but causes odd scrolling problem, toggle to see if it helps
_menuCloseDelay=500;
_menuOpenDelay=150;
_subOffsetTop=4;
_subOffsetLeft=-2;


with(about=new mm_style()){
styleid=3;
bordercolor="#ffffff";
borderstyle="solid";
borderwidth=0;
fontfamily="Arial,verdana,helvetica";
fontsize="13px";
fontstyle="normal";
fontweight="normal";
separatorcolor="white";
separatorsize=1;
}

with(profile=new mm_style()){
styleid=4;
bordercolor="#ffffff";
borderstyle="solid";
borderwidth=0;
fontfamily="Arial,verdana,helvetica";
fontsize="13px";
fontstyle="normal";
fontweight="normal";
separatorcolor="white";
separatorsize=1;
}


with(WhiteBlue=new mm_style()){
styleid=2;
fontfamily="Arial,verdana,helvetica";
fontsize="13px";
fontstyle="normal";
fontweight="normal";
offbgcolor="#FFFFFF";
offcolor="#5d5d99";
onbgcolor="#5d5d99";
oncolor="#FFFFFF";
bordercolor="#ccd6e0";
borderstyle="solid";
borderwidth=1;
padding=6;
separatorcolor="#5d5d99";
separatorsize=1;
}

with(milonic=new menuname("profile")){
style=WhiteBlue;
menuwidth=115;
top="offset=-1";
aI("text=Profile;url=doctor_profile.html;");
aI("text=Interview;url=interview.html;");
}

with(milonic=new menuname("about")){
style=WhiteBlue;
menuwidth=150;
top="offset=-1";
aI("text=Uveitis;url=ed_uveitis.html;");
aI("text=Glaucoma;url=ed_glaucoma.html;");
aI("text=Diabetic Retinopathy;url=ed_diabetic_retinopathy.html;");
aI("text=Dry Eye;url=ed_dry_eye.html;");
aI("text=Retinal Detachment;url=ed_retinal_detachment.html;");
aI("text=Macular Degeneration;url=ed_macular_degeneration.html;");
aI("text=Cataract;url=ed_cataract.html;");
aI("text=Refractive Surgery Lasik;url=ed_lasik.html;");
}

drawMenus();

