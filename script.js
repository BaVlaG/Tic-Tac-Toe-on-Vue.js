

$(document).ready(function(){
	var n = 0;
	$('span').each(function(){
		$(this).addClass('cell' + n++);
	})

})

var vm = new Vue({

  el: '#app',
  data:{
	  flag: false,
	  flagWin: false,
	  message: '',
	  winLine: ['012', '345', '678', '036', '147', '258', '048', '246']
  },
  
  methods:{
	  setValue:function(event){

			 var currentCell = event.target;

			 if ($(currentCell).text() == '' && this.flagWin == false){
				 $(currentCell).find('span').text('O');
				 
				 if (this.flag == false){
					 this.moveRandomCell();
				  } else {
					 this.flag = false;
				  }
				  
				  if (this.checkWinner('O')){
					  return;
				  }
				   if (this.checkWinner('X')){
					  return;
				  }
				  this.moveComp();
			 }   
	  },
	  
	  checkWinner: function (value){
			   var count = 0;	
			  for (let i = 0; i < this.winLine.length; i++ ){
			       
				   var firstNumber = '.cell' + this.winLine[i].substr(0, 1);
				   var secondNumber = '.cell' + this.winLine[i].substr(1, 1);
				   var thirdNumber = '.cell' + this.winLine[i].substr(2, 1);
				   
				   if (value == 'O'){
					   if ($(firstNumber).text() == value && 
					   $(secondNumber).text() == value &&
					   $(thirdNumber).text() == value){
						   $(firstNumber + ',' + secondNumber + ',' + thirdNumber).css({'textDecoration': 'line-through', 'color':'Green'});
						   $('h1').css('color','green');
						   this.message = 'You won!!!'
						   this.flag = true;
						   this.flagWin = true;
						   return true;
						}
				   }
				   
				   if (value == 'X'){
					   if ($(firstNumber).text() == 'X' && $(secondNumber).text() == 'X' && $(thirdNumber).text() == ''){
							$(thirdNumber).text('X');
							$(firstNumber + ',' + secondNumber + ',' + thirdNumber).css({'textDecoration': 'line-through', 'color':'red'});
							$('h1').css('color','red');
							this.message = 'Computer won!!!'
							this.flag = true;
							this.flagWin = true;
							return true;
						}
						
						if ($(firstNumber).text() == 'X' && $(secondNumber).text() == '' && $(thirdNumber).text() == 'X'){
							$(secondNumber).text('X');
							$(firstNumber + ',' + secondNumber + ',' + thirdNumber).css({'textDecoration': 'line-through', 'color':'red'});
							$('h1').css('color','red');
							this.message = 'Computer won!!!'
							this.flag = true;
							this.flagWin = true;
							return true;
						}
						
						if ($(firstNumber).text() == '' && $(secondNumber).text() == 'X' && $(thirdNumber).text() == 'X'){
							$(firstNumber).text('X');
							$(firstNumber + ',' + secondNumber + ',' + thirdNumber).css({'textDecoration': 'line-through', 'color':'red'});
							$('h1').css('color','red');

							this.message = 'Computer won!!!'
							this.flag = true;
							this.flagWin = true;
							return true;
						}
					} 					
			  }
			  $('span').each(function(){
				  if ($(this).text() != ''){
					  count++;
				  }
			  })
			  if (count == 9){
				  this.message = 'Draw!!!'
				  this.flag = true;
			  }
		  },
		  
		  moveComp: function (){

			  for (let i = 0; i < this.winLine.length; i++ ){
			       
				   var firstNumber = '.cell' + this.winLine[i].substr(0, 1);
				   var secondNumber = '.cell' + this.winLine[i].substr(1, 1);
				   var thirdNumber = '.cell' + this.winLine[i].substr(2, 1);
					
					if (this.flag == false){
						if ($(firstNumber).text() == 'O' && $(secondNumber).text() == 'O' && $(thirdNumber).text() == ''){
							$(thirdNumber).text('X');
							this.flag = true;
						} 
					}
					
					if (this.flag == false){
						if ($(firstNumber).text() == 'O' && $(secondNumber).text() == '' && $(thirdNumber).text() == 'O'){
							$(secondNumber).text('X');
							this.flag = true;
						}
					}
					
					if (this.flag == false){
						if ($(firstNumber).text() == '' && $(secondNumber).text() == 'O' && $(thirdNumber).text() == 'O'){
								$(firstNumber).text('X');
								this.flag = true;
						} 
					}
								
					if (this.flag == true){
						break;
					}

			  }
			  
			  if (this.flag == false){
				  this.moveRandomCell();

			  }
		  },
			  
		  moveRandomCell: function(){
			  var allCells = $('.cell');
			  var emptyCells = [];
				  for (let i = 0; i < allCells.length; i++){
					  if ($(allCells[i]).text() == ''){
						  emptyCells.push(i);
					  }
				  }
				  var randomNumber = (Math.floor(Math.random()*((emptyCells.length -1) - 0 + 1)));
				  var randomCell = $('.cell' + emptyCells[randomNumber]);
				  $(randomCell).text('X');
				  this.flag = true;
		  }
		  
  }

});
