class surface {
	constructor(pointA, pointB) {
		this.pointA = pointA;
		this.pointB = pointB;
	}
}
function dist(p1, p2)
{
	return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) - (p1[1] - p2[1]) * (p1[1] - p2[1]));
}
function find_angle(p1,p2)
{
	let angle1=0;
	if(p1[0]==p2[0])
	{
		if(p2[1]<p1[1])
		{
			angle1=-Math.PI/2;
		}
		else
		{
			angle1=Math.PI/2;
		}
	}
	else
	{
		angle1=Math.atan(p2[1]-p1[1]/p2[0]-p1[0]);
		if(p2[0]<p1[0])
		{
			if(angle1<=0)
			{
				angle1+=Math.PI;
			}
			else
			{
				angle1-=Math.PI;
			}
		}
	}
	return angle1;
}
function angle_between(A,B)
{
	return Math.asin((A[1]*B[1]+A[0]*B[0])/Math.sqrt(A[1]*A[1]+A[0]*A[0])/Math.sqrt(B[1]*B[1]+B[0]*B[0]));
}
let x = 0;
let y = 0;
let Thita = 0;
let Delta = 0;
let surfaces = [];
let hFOV = 160 * Math.PI / 180;
let vFOV = 90 * Math.PI / 180;
let number_of_surfaces = 4;
let circum_radius = 128;
let hieght_of_wall = circum_radius / 4;
for (let i = 0; i < 4; i++)
{
	let pointA = [circum_radius * Math.sin(Math.PI * i / 4), circum_radius * Math.cos(Math.PI * i / 4)];
	let pointB = [circum_radius * Math.sin(Math.PI * (i + 1) / 4), circum_radius * Math.cos(Math.PI * (i + 1) / 4)];
	surfaces[i] = new surface(pointA, pointB);
}
const canvas = documant.getElementById("canvas");
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;
let running=true;
while (true)
{
	document.addEventListener("keydown", function (event) {
		if (event.keyCode == 65)
		{
			Thita -= Math.PI / 90;
			if(Thita<=-Math.PI)
			{
				Thita+=2*Math.PI;
			}
		}
		else if (event.keyCode == 68)
		{
			Thita += Math.PI / 90;
			if(Thita>Math.PI)
			{
				Thita-=2*Math.PI;
			}
		}
		else if (event.keyCode == 87)
		{
			x += Math.sin(Thita) * circum_radius / 16;
			y -= Math.cos(Thita) * circum_radius / 16;
		}
		else if (event.keyCode == 83)
		{
			x -= Math.sin(Thita) * circum_radius / 16;
			y += Math.cos(Thita) * circum_radius / 16;
		}
		else if (event.keyCode == 27)
		{
			running=false;
		}
	});
	if(!running)
	{
		break;
	}
	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.moveTo(0,0);
	column_no=0;
	for(Alpha=Thita-hFOV/2;Alpha<Thita+hFOV/2;Alpha+=Math.PI/180)
	{
		let Aplha1=Alpha;
		if(Alpha>Math.PI)
		{
			Alpha1=Alpha-Math.PI;
		}
		else if(Alpha<=-Math.PI)
		{
			Alpha1=Alpha+Math.PI;
		}
		let dist_min=-1;
		let slope=-1;
		let c=-1;
		let normal=-1;
		let distance_from_player=-1;
		let angle_from_normal=-1;
		for(i=0;i<surfaces.length;i++)
		{
			let angle1=find_angle(surfaces[i].pointA,[x,y]);
			let angle2=find_angle(surfaces[i].pointB,[x,y]);
			let intercept=false;
			if(Math.abs(angle1-angle2)<Math.PI)
			{
				if((Alpha1>angle1&&Alpha1<angle2)||(Alpha1<angle1&&Alpha1>angle2))
				{
					intercept=true;
				}
			}
			else
			{
				if(angle1>Math.PI/2)
				{
					if(Alpha1>angle1||Alpha1<angle2)
					{
						intercept=true;
					}
				}
				else
				{
					if(Alpha1>angle2||Alpha1<angle1)
					{
						intercept=true;
					}
				}
			}
			if(intercept)
			{
				if(surfaces[i].pointB[0]!=surfaces[i].pointA[0])
				{
					slope=(surfaces[i].pointB[1]-surfaces[i].pointA[1])/(surfaces[i].pointB[0]-surfaces[i].pointA[0]);
				}
				else
				{
					slope=inf
				}
				if(slope=inf)
				{
					c=inf;
				}
				else
				{
					c=surfaces.pointA[1]-slope*surfaces.pointB[1];
				}
				let temp_vect1=[Math.cos(Alpha),Math.sin(Alpha)];
				let temp_vect2=0;
				if(slope!=inf)
				{
					temp_vect2=[1,-1/slope];
				}
				else
				{
					temp_vect2=[1,0];
				}
				angle_from_normal=angle_between(vect1,vect2);
				if(slope!=inf)
				{
					normal=Math.abs((slope*x-y+c)/Math.sqrt(slope*slope+1));
					distance_from_player=normal/Math.sin(angle_from_normal);
				}
				else
				{
					normal=Math.abs(surfaces[i].pointA[0]-x);
					distance_from_player=normal/Math.sin(angle_from_normal);
				}
				dist_min=Math.min(distance_from_player,dist_min);
			}
		}
		if(dist_min==-1||dist_min>256)
		{
			brightness=255;
			height_of_drawn_column=hieght;
		}
		else
		{
			brightness=255(1-dist_min/256);
			height_of_drawn_column=height*Math.atan(height_of_wall/dist_min)/vFOV;
		}
		ctx.lineWidth=10;
		ctx.strokeStyle="#"+brightness.toString(16)+brightness.toString(16)+brightness.toString(16);
		ctx.moveTo(column_number,height/2-height_of_drawn_column);
		ctx.lineTo(column_number,height/2+height_of_drawn_column);
		column_number+=width/(hFOV*180/Math.PI);
	}
	ctx.stroke();
}