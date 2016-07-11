
function sankeyFunction(stringToFind) {
	d3.csv("data/discursos_original.csv", function(error, data) {

		var backArray = [];
		var backAmounts = [];
		var frontArray = [];
		var frontAmounts = [];
		stringToFind = stringToFind.toLowerCase()

		data.forEach(function(d) {
			var str = d.Fala;

			if(str != undefined){
				str = str.replace(/[,.! ]+/g, " ");
				str = str.toLowerCase();

				var vec = str.split(" ");
				for(var j=0; j<vec.length; j++){
					if(vec[j].match(stringToFind)){

						indBack = backArray.indexOf(vec[j-1]);
						if(indBack == -1){
							backArray.push(vec[j-1])
							backAmounts.push(1);
						}else{
							backAmounts[indBack]++;
						}

						indFront = frontArray.indexOf(vec[j+1]);
						if(indFront == -1){
							frontArray.push(vec[j+1])
							frontAmounts.push(1);
						}else{
							frontAmounts[indFront]++;
						}
					}
				}
			}
		});

		for (var i = 0; i < frontAmounts.length; i++) {
			//if(frontAmounts[i] == 5 || frontAmounts[i] == 8)
				console.log(frontArray[i],frontAmounts[i]);
		}

		var limit = 1;

		for (var i = 0; i < backAmounts.length; i++) {
			if(backAmounts[i] <= limit){
				backAmounts.splice(i,1);
				backArray.splice(i,1);
				i--;
			}
		}

		for (var i = 0; i < frontAmounts.length; i++) {
			if(frontAmounts[i] <= limit){
				frontAmounts.splice(i,1);
				frontArray.splice(i,1);
				i--;
			}
		}

		var sankey = new Sankey();

		sankey.stack(0, backArray);
		sankey.stack(1,[stringToFind]);
		sankey.stack(2,frontArray);

		var dataList = [];

		for (var i = 0; i < backArray.length; i++) {
			var backList = [backArray[i], backAmounts[i], stringToFind];
			dataList.push(backList);
		}

		for (var i = 0; i < frontArray.length; i++) {
			var frontList = [stringToFind, frontAmounts[i], frontArray[i]];
			dataList.push(frontList);
		}

		sankey.setData(dataList);
		sankey.draw();



	});
}


$(document).ready(function() {
	sankeyFunction("voto");
});

function changeWord() {
	$("#sankey").html("");
	sankeyFunction(document.getElementById("text1").value);
}
