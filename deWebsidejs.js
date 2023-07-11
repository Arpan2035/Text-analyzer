$(document).ready(function(){
	
	function results( numWords, avWords, maxWordsText, minWordsText, htmlMostFrequent, numSentences, avSentences, maxSentencesText, maxSentencesCount, minSentencesText, minSentencesCount){
		var res = 
			 '<h2><center>Results</center></h2>' +
			 '<br><b>Words: </b>' + numWords +
			 '<br><b>Average word lenght: </b>' + avWords + ' chars' +
			 '<br><b>Longest word: </b>' + maxWordsText +
			 '<br><b>Shortest word: </b>' + minWordsText +
			 '<br><b>TOP 5 most frequent words: </b>' + htmlMostFrequent +
			 '</div><div id="right">' + 
			 '<b>Sentences: </b>' + numSentences +
			 '<br><b>Average words/sentence: </b>' + avSentences +
			 '<br><b>Longest sentence ('+ maxSentencesCount+ ' chars): </b>'+
			 '<br><i>"' + maxSentencesText + '"</i>' +
			 '<br><b>Shortest sentence ('+ minSentencesCount + ' chars): </b>' +
			 '<br><i>"' + minSentencesText + '"</i>' +
			 '</div>';
		$('#output').html(res);
	}
	
	function analyze(){
		var text = document.getElementById("input").value;
	
		// Words count, max, min, average - BEGIN
		var Words = text.replace(/\W/g, ' ').replace(/\s{2,}/g, ' ').trim().split(' ');
		var numWords = Words.length; // count
		var avWords = Math.round(Words.join('').length/numWords*100)/100; // average chars in a word
		// max begin
		var maxWordsCount = Words[0].length;
		var maxWordsText = Words[0];
		Words.forEach(function(val){
			if (val.length > maxWordsCount){
				maxWordsCount = val.length;
				maxWordsText = val;
			}
		})
		// max end
		// min begin
		var minWordsCount = Words[0].length;
		var minWordsText = Words[0];
		Words.forEach(function(val){
			if (val.length < minWordsCount){
				minWordsCount = val.length;
				minWordsText = val;
			}
		})
		// min end
		
		
		// Most Frequent begin
		var textWords = text.replace(/\W/g, ' ').replace(/\s{2,}/g, ' ').trim().split(' '); 
		var textWordsLen = textWords.length;
		var textWordsCount = [];

		textWords.forEach(function(val, i){
			textWordsCount[i] = 1;
			for (var j=i+1; j<textWordsLen; j++){
				if (textWords[i] == textWords[j]){
					textWordsCount[i]++;
					textWords.splice(j, 1);
					j--;
				}
			}				
		})
		// Most Frequent object
		var textMostFrequent = [];
		function textWordsObject(num, word){
			this.num = num;
			this.word = word;			
		}
		textWordsLen = textWords.length;
		for (var i=0; i<textWordsLen; i++){
			textMostFrequent[i] = new textWordsObject(textWordsCount[i], textWords[i]);
		}
		// Most Frequent sort		
		textMostFrequent.sort(function(a, b){
			return b.num - a.num;
		})
		//Most Frequent html TOP 5
		var htmlMostFrequent = '';
		textMostFrequent.every(function(val, i){
			htmlMostFrequent += '<br> <i>' + val.word + '</i> - ' + val.num + ' matches';
			if (i==4)
				return false;
			else
				return true;
		});
		
		// Most frequent end		
		// Words count, max, min, average - END
		
		// Sentences count max, min, average - BEGIN
		// get rid of spaces
		var Sentences = text.replace(/\n{1,}/g, '. ').replace(/[?!.]{1,}/g, '.').split('. '); 
		Sentences.forEach(function(val, i){
			Sentences[i] = Sentences[i].trim();
		})
		if (Sentences[Sentences.length-1]=='')
			Sentences.splice(Sentences.length-1, 1);
		// count, av words/sentence	
		var numSentences = Sentences.length; 
		var avSentences = Math.round(numWords/numSentences*100)/100;
		// max sentences begin
		var maxSentencesCount = Sentences[0].length;
		var maxSentencesText = Sentences[0];
		Sentences.forEach(function(val){ 
			if (val.length > maxSentencesCount){
				maxSentencesCount = val.length; 
				maxSentencesText = val;
			}
		})
		// max sentences end
		// min sentences begin
		var minSentencesCount = Sentences[0].length;
		var minSentencesText = Sentences[0];
		Sentences.forEach(function(val){
			if (val.length < minSentencesCount){
				minSentencesCount = val.length;
				minSentencesText = val;
			}
		})
		// min sentences end
		// Sentences count max, min, average - END
		
		results(numWords, avWords,
				  maxWordsText, minWordsText, htmlMostFrequent, numSentences,
				 avSentences, maxSentencesText, maxSentencesCount, 
				  minSentencesText, minSentencesCount);
	}
	
	$('#run').on('click', function(){
		if (document.getElementById("input").value != ''){
			var mainHeight = $("#main").css('height');
			analyze();
			$("#main").css("height", "auto");
			var newMainHeight = $("#main").css('height');
			$("#main").height(mainHeight).animate({height: newMainHeight}, 500);
		}
		else {
			alert('Please, insert your text into the textarea!');
		}
	})
	
	
})