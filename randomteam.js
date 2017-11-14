const fs= require('fs');
var shuffle = require('shuffle-array');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question("Please enter your json file path? ", function(answer) {
fs.readFile(answer, 'utf8', function (err, data) {
    if (err) 
    	{
    		 console.error("file error"); process.exit();
    	}
    if(!data)
    {
    	console.log("json file empty or syntax error");
    	process.exit();
    }
    var obj = JSON.parse(data);
    var asize = Object.keys(obj).length;
    rl.question("please enter team size",function(tsize){
    if(tsize==0|tsize<0)
    {
    	console.log("team size cant be zero or lesser");
    	process.exit();
    }
    if(tsize>asize)
    {
    	console.log("team size cant be greater than total member size");process.exit();
    }
    var rem=asize%tsize;
    var initnum=Math.floor(asize/tsize);
    var addnum=asize-(initnum*tsize);
    var tnum;
    let writestream = fs.createWriteStream('H:/berkadia/week2/team.txt');


    if(rem==0)
    {
    	console.log("------------------------------------------------------");
    	console.log("creating-"+initnum+" number of teams with size"+tsize);tnum=initnum;
      writestream.write("created-"+initnum+" number of teams with size"+tsize);

    	
    }
    else
    {
    	console.log("----------------------------------------------------------");
    	console.log("creating-"+initnum+" number of team with size"+tsize+" and one team with size-"+addnum);
    	writestream.write("created-"+initnum+" number of team with size"+tsize+" and one team with size-"+addnum);
    	tnum=initnum+1;
    }
    var i,j=1;
    var arr=[];
    for(i=0;i<asize;i++)
    {
	arr.push(j);
	j++;
    }
    shuffle(arr);
    
    var u=0;
    var p;
    var temp=tsize;
    for( p=1;p<=tnum;p++)
           {
           	console.log("------");
           	console.log("team"+p);
           	console.log("-------");
            writestream.write("\n---------");
            writestream.write("\nteam"+p);
            writestream.write("\n---------");

           for(var x=0;x<temp;x++,u++)
           {
          		if(u>=asize)
           		{
           			break;	
           		}
           		var z=arr[u];
              console.log("-------------");
           		console.log("team member");
           		console.log("-------------");
              writestream.write("\n--------------");
              writestream.write("\nteam member ");
              writestream.write("\n--------------");
           		console.log("name is-"+obj["aspirant"+z]["name"]);
           		console.log("branch is-"+obj["aspirant"+z]["branch"]);
           		console.log("favourite language is-"+obj["aspirant"+z]["favlang"]);
              writestream.write("\nname is-"+obj["aspirant"+z]["name"]);
              writestream.write("\nbranch is-"+obj["aspirant"+z]["branch"]);
              writestream.write("\nfavourite language  is-"+obj["aspirant"+z]["favlang"]);
           	}
           
           }
           
           console.log("-------------");
           console.log("end of teams");
            writestream.write("\n-------------");
            writestream.write("\nend of teams");
            writestream.on('finish', () => { 
                console.log("----------------------------");
                console.log('wrote all teams data to file');
                                    });


          writestream.end();  
});
});	
});