// let DB = {
//     que : [],
//     ans : []
// }

// DB.que.push(`HELLO..., 
// Welcome to our Survey System.
// Our A.I. System will ask you the Questions , and you have to give the answer after the beep sound , 
// "Say "SKIP" to skip any question."
// To go further say "OK" or Say "REPEAT" to listen the Instructions again`);
// DB.que.push('What is your name?');
// DB.que.push('What is your Age?');
// DB.que.push('What is your Birth Place?');
// DB.que.push(`Do you experience any of the symptoms like Cold , Fever , Cough , Shortness of breath , Headache , Muscle pain , Sore throat , Diarrhea , Taste disorders. Metion your symptons. Or Say "I am fine" if you not experience any symptoms ?`);
// DB.que.push(`Do you suffer from any of the below diseases?
// "Cardiovascular diseases" , "Diabetes" , "Asthma" , "Bronchitis" , "Cancer"`);
// DB.que.push(`Do you have a travel history to any of these countries?
// "China" , "Italy" , "Spain" , "France" , "US" , "Saudi Arabia" , "UK"`);
// DB.que.push(`Approximately, how many people have you come in contact with in past 15 days?`);
// DB.que.push(`Have you already shared your medical history with government authorities?
// If yes then Please mention the site name or simply say "SKIP" `);
// DB.que.push(`How many senior citizens do you have at home ?`);
// DB.que.push(`Have you been tested at airport or hospital ?
// If yes then please mention the name of the place OR if no simply say "SKIP"`);
// DB.que.push(`Do you smoke? If Yes Say "I do" OR if no Say "SKIP"`);
// DB.que.push(`Do you drink alcohol ? If Yes Say "I do" OR if no Say "SKIP"`);
// DB.que.push(`Do you work in any of these high risk occupations?
// "Healthcare" , "Assisted-living" , "Military-institution" , "Aged-care facility"`)

// console.log("DB >>",DB.que);

// let conFirmMsg = "For confirmation say YES or NO to speech again"

// let index = 0;
// let confirmAction = false;
// let ansDataval = "";
// var re_peat="";


// $(document).ready(function () {
//     $(hide_div).hide();
//     var audio = document.getElementById("player");
    
//     toastr.info(`IMPORTANT INFORMATION!! \nRemember that if you want to skip any question say "SKIP"`);
//     toastr.info(`IMPORTANT INFORMATION!! \nIf the answer of the question is "YES" say "I do" \nAnd if the answer is "NO" say "SKIP"`);
//     toastr.info(`Only Say "YES" And "NO" While Confirmation Message!!`)

//     $('#play').click(function (){
//         startQue(index,confirmAction);
//         $(play).hide();
//         $(hide_div).show();
//     });
//     $('#hide_div').click(function (){
//         var x = confirm(`Are You Sure you want click this\n This button is only use to repeat the questions.\n Or When our A.I. missed your answer. `);

//         if (x) {
//             startQue(re_peat,false);
//             console.log('its working..');
//             return true;
            
//         }else {
//             return false;
//         }
       
//     });
    
    
//     let count = 0;
//     function startQue(indexVal,confVal) {
//         re_peat=indexVal;
//         console.log('indexVal >>>>', indexVal);
//         console.log("Count: ",count);
//         if(indexVal < DB.que.length){
//             document.getElementById("que_data").innerHTML = DB.que[indexVal];
//             // + " Please Speak after the beep sound"
//             let data = DB.que[indexVal] ;
//             if(confVal == true){
//                 data = conFirmMsg;
//             }
//             console.log("Data: ",data);
//             let speech = new SpeechSynthesisUtterance();
//             speech.lang = "en-US";
//             speech.text = data;
//             speech.volume = 100;
//             speech.rate = 2;
//             speech.pitch = 0.7;
//             window.speechSynthesis.speak(speech);
//             speech.onend = function () {
//                 count = count + 1;
//                 console.log('Count St - Onend: ',count);
//                 runSpeechRec(indexVal,confVal);
//             }
//         }
//         else{
//             document.getElementById("que_data").innerHTML = "<b>Thank You For Participating in our Survey Have a Nice Day.</b>"
//             document.getElementById("ans_data").innerHTML = ""
//             document.getElementById("demo").innerHTML = DB.ans;
//         }
//     }
//     // Repeat 
    
    
//     function runSpeechRec(indexVal,confVal) {
//         console.log("SpeechInd >>>>",indexVal);
//         console.log("confVal >>>>",confVal);
//         audio.play();
//         count = count + 1;
//         console.log('Count - Audio: ',count);
//         var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
//         var recognition = new SpeechRecognition();

//         recognition.onresult = function (event) {
//             let ansData = event.results[0][0].transcript;
//             let confidence = event.results[0][0].confidence;
//             console.log("Ans >>>>>",ansData);
            
    
//             // [ Yes ]
//             if(ansData == 'yes'|| ansData=='y'|| ansData=='yes yes'|| ansData=='yes yes yes'){
//                 DB.ans.push(ansDataval);
//                 console.log('ansDataval>>>'+ansDataval);
//                 indexVal = indexVal+1;
//                 console.log("DB >>",DB.ans);
//                 document.getElementById("ans_data").innerHTML = "<b>Ans :</b> ";
//                 count = count + 1;
//                 console.log('Count - Yes: ',count);
//                 startQue(indexVal,false);
//             }
//             // [ No ]
//             else if(ansData == 'no' || ansData=='n'|| ansData=='no no'|| ansData=='no no no') {
//                 console.error("No");
//                 ansDataval = ansData;
//                 document.getElementById("ans_data").innerHTML = "<b>Ans :</b> " + ansData;
//                 count = count + 1;
//                 console.log('Count - No: ',count);
//                 startQue(indexVal,false);
//             }
//             else {
//                 console.error("Else");
//                 ansDataval = ansData;
//                 document.getElementById("ans_data").innerHTML = "<b>Ans :</b> " + ansData;
//                 count = count + 1;
//                 console.log('Count - No: ',count);
//                 // startQue(indexVal,false);
//             }
//             if(confVal == true){

//             }else{
//                 console.error('-E-L-S-E-');
//                 startQue(indexVal,true);
//             }
            
           
//         };
//         recognition.start();
//     }
    
    
// });
// // function repeat() {
// //     console.log('Its Workingggg');
// //     startQue(indexVal,false);
// // }