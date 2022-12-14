# you-draw-it
![Image of you-draw-it bar chart](https://github.com/EE2dev/you-draw-it/blob/master/images/bar.png)![Image of you-draw-it line chart](https://github.com/EE2dev/you-draw-it/blob/master/images/line.png)![Image of you-draw-it multiple choice chart](https://github.com/EE2dev/you-draw-it/blob/master/images/multipleChoice.png)

You-draw-it lets you configure a quiz with questions. This quiz supports answers for a single value, sequence of values and multiple choice. The user can specify the numeric answers (single number or sequence of values, e.g. time series) by drawing interactively.

### Credits
- This you-draw-it implementation is adapted from the great work at https://github.com/wdr-data/you-draw-it
- Original idea developed by [the New York Times](https://www.nytimes.com/interactive/2015/05/28/upshot/you-draw-it-how-family-income-affects-childrens-college-chances.html)
- The visualization and interaction features were implemented using the amazing library [d3.js](https://d3js.org/)

### Examples
- [fun facts](https://bl.ocks.org/EE2dev/8cc9d3a19df00f30cf011a8fd5f3d7e4/)
- [datasketches](https://bl.ocks.org/ee2dev/fef9374c83cd2d860e52ca392ea22bf5)
- [minecraft](https://bl.ocks.org/EE2dev/d2fe539e84c7fa27566bf4c1a1b16eeb/)
- [minecraft - custom font](https://bl.ocks.org/EE2dev/17460b7600768ca9aca47090f0b85bd4/)
- [newspaper article in rtbf in French](https://www.rtbf.be/info/societe/detail_vacances-salaire-vos-prejuges-sur-les-profs-correspondent-ils-a-la-realite?id=10011363)
- [example with reference values](https://bl.ocks.org/EE2dev/93c813e9099a2783235883f00ebbb9f1)
- [example with individually styled reference values](https://bl.ocks.org/ee2dev/9d2f6823eb9914578bf1480f2a88902d)
- [example with multiple choice questions](https://bl.ocks.org/EE2dev/f0cd67b9b68d79f5824af8656254f5e7/)

### Templates
- [English-bare template](https://bl.ocks.org/ee2dev/9e1984c29d946b2912beb62df680ff9a)
- [English template](https://bl.ocks.org/ee2dev/5e553c5b50d2b12d2d3d707c89c849f2)
- [German template](https://bl.ocks.org/ee2dev/e085741d2376c4c12800c855f381266d)


## 1. How to use you-draw-it
### 1.1 Using you-draw-it (with internet connection)
The easiest way to start off is to create an html file with the following content:
```
<!DOCTYPE html>
  <meta charset="utf-8">

  <head>
    <title>My quiz</title>
    <meta name="viewport" content="width=device-width,user-scalable=yes,initial-scale=1,minimum-scale=1">
    <link rel="stylesheet" href="https://ee2dev.github.io/ydi/css/style.css">
  </head>

  <body>
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script src="https://ee2dev.github.io/ydi/js/youdrawit.min.js"></script>    
    <script>
      var questions = [];
      var question = {};
     
      var globals = { 
        default: "en"
      };

      // ----- for additional questions, copy FROM here
      question = { 
        heading: "Question 1",
        data: [
          {2015: 1503451}, 
          {2016: -1491897}, 
          {2017: 1495333}, 
          {2018: 1453203}, 
          {2019: 1458438}, 
          {2020: 1442801}
          ]
      };
      questions.push(question);
      // ----- for additional questions, copy TO here     

      // ----- for additional questions, copy FROM here
      question = {
        heading: "Question 2",
        data: 17.1,
      };
      questions.push(question);
      // ----- for additional questions, copy TO here  

      var myChart = youdrawit
        .chart()
        .globals(globals)
        .questions(questions);

      d3.select("body")
        .append("div")
        .attr("class", "chart")
        .call(myChart);
    </script>
  </body>
</html>  
```
### 1.2 Using you-draw-it (local version - no internet required)
All you need to do is
1. download the zipped repository by clicking on the green button![button image](images/button.jpg) at the top part of the repository page and select ![download zip image](images/dz.jpg)
2. unzip the downloaded repository
3. navigate to the *dist* directory
4. open one of the three templates in a browser (e.g. templateEnglish.html) to see it running locally
5. make a copy of the template and adjust/add/remove the questions and answers in a text editor

### 1.3 General usage
In the javascript portion three variables are defined:
- `questions` which is an *array* of `question` *objects*.
- `question` which is an *object* containing all infos about that question
- `globals` which is an *object* containing global settings, mainly *text* or *html* strings, which are displayed during the course of the quiz.

All you need to do is
1. to adjust the two properties of each `question`
    - `heading` refering to a *string* with one particular quiz question. This *string* can contain *text* or *html* (in case want to format your question in a certain way).
    - `data` refering to the value or values of the correct answer. 
       - In case a single value is the answer (which is represented by a bar chart), `data` has to be initialized with the correct *number*.
       - In case a sequence of values is the answer (which is represented by a line chart), `data` has to be initialized by an *array* of *objects*. Each *object* is a point in the sequence and has to be initialized by a key (which will be the x coordinate) and its value (which will be the y coordinate)
       - In case multiple choice (of text) is the answer, `data` has to be initialized by an *array* of *objects*. Each *object* is a possible answer and has to be initialized by a key (which will be the possible answer) and a *boolean* value (which indicates if the answer is correct)
2. to add more `question`'s you can simply copy the block commented with ... `copy FROM here` until ... `copy TO here`, adjust the properties and you are ready to go!

For specific adjustments take a look at [tips & tricks](https://github.com/EE2dev/you-draw-it#14-tips--tricks) and [the API reference](https://github.com/EE2dev/you-draw-it#2-api-reference). 

### 1.4 Tips & tricks
- **number of digits**
It is recommended using at most 4 digits for any value. The value is displayed with all thousands as well as the decimal separator. The number of displayed digits after the decimal spearator can be specified with [`question.precision`](https://github.com/EE2dev/you-draw-it#q-precision) 
- ***text* vs *html***
The following options can be set with either *text* or *html*:
    - [`globals.header`](#g-header)
    - [`globals.subHeader`](#g-subHeader)
    - [`globals.scoreHtml`](#g-scoreHtml)
    - [`question.heading`](#q-heading)
    - [`question.subHeading`](#q-subHeading)
    - [`question.resultHtml`](#q-resultHtml)

- **final score**
You can add a *text* or *html* after the final score is shown. In addition you can show a different *text* or *html* based on the final score. See [`globals.scoreHtml`](#g-scoreHtml) for details.
- **using a different font**
See section [Using a different font](#30-using-a-different-font)
- **template**
You can use [this template](https://bl.ocks.org/ee2dev/5e553c5b50d2b12d2d3d707c89c849f2) which lists all `globals` and `question` options.

## 2. API Reference

### 2.1 A visual reference to the configuration options

[![visual reference of the configuration options](https://github.com/EE2dev/you-draw-it/blob/master/images/visualReference_small.jpg)](https://github.com/EE2dev/you-draw-it/tree/master/visualReference)

[Click here](https://github.com/EE2dev/you-draw-it/tree/master/visualReference) to the see the visual reference to the configuration options.

### 2.2 The configuration object `globals`

<a href="#g-default" id="g-default">#</a> globals.<b>default</b>

Sets the several undefined properties of `globals` to default values. If a property is already defined, it is not overridden.
Three values are currently supported:
- globals.default = "en". 
Initialization with English defaults. In addition, the thousands separator is set to `,`(comma) and the decimal separator to `.`(dot). The English default is also applied if no default is specified.  
```
// globals.default = "en" applies the following initialization:
var globals = { 
        default: "en",
        resultButtonText: "Show me the result!",
        resultButtonTooltip: "Draw your guess. Upon clicking here, you see if you're right.",
        scoreTitle: "Your result:",
        scoreButtonText: "Show me how good I am!",
        scoreButtonTooltip: "Click here to see your result",
        drawAreaTitle: "Your\nguess",
        drawLine: "draw the graph\nfrom here to the end",
        drawBar: "drag the bar\nto the estimated height",
    };
```
- globals.default = "de".
Initialization with German defaults. In addition, the thousands separator is set to `.`(dot) and the decimal separator to `,`(comma).
```
// globals.default = "de" applies the following initialization:
var globals = { 
        default: "de",
        resultButtonText: "Zeig mir die L??sung!",
        resultButtonTooltip: "Zeichnen Sie Ihre Einsch??tzung. Der Klick verr??t, ob sie stimmt.",
        scoreTitle: "Ihr Ergebnis:",
        scoreButtonText: "Zeig mir, wie gut ich war!",
        scoreButtonTooltip: "Klicken Sie hier, um Ihr Gesamtergebnis zu sehen"",
        drawAreaTitle: "Ihre\nEinsch??tzung",
        drawLine: "Zeichnen Sie von hier\nden Verlauf zu Ende",
        drawBar: "Ziehen Sie den Balken\nauf die entsprechende H??he",
    };
```

- globals.default = "fr".
Initialization with French defaults. In addition, the thousands separator is set to ` `(space) and the decimal separator to `,`(comma). Shout-out to Ambroise Carton for the translation! 

```
// globals.default = "fr" applies the following initialization:
var globals = { 
        default: "fr",
        resultButtonText: "Montrez-moi le r??sultat",
        resultButtonTooltip: "A vous de dessiner la courbe. Pour voir la bonne r??ponse, cliquez ici",
        scoreTitle: "Votre r??sultat:",
        scoreButtonText: "Montrez-moi la bonne r??ponse",
        scoreButtonTooltip: "Cliquez ici pour obtenir des explications",
        drawAreaTitle: "Votre supposition",
        drawLine: "Placez votre doigt ou votre souris ici et dessinez la courbe",
        drawBar: "Montez la barre jusqu????? la hauteur suppos??e",
    };
```

<a href="#g-header" id="g-header">#</a> globals.<b>header</b>

Sets the *text* or *html* containing the header (= first line of the quiz).

<a href="#g-subHeader" id="g-subHeader">#</a> globals.<b>subHeader</b>

Sets the *text* or *html* containing the subHeader (= second line of the quiz).

<a href="#g-drawAreaTitle" id="g-drawAreaTitle">#</a> globals.<b>drawAreaTitle</b>

Sets the *text* denoting the area to be drawn by the user.

<a href="#g-drawLine" id="g-drawLine">#</a> globals.<b>drawLine</b>

Sets the *text* denoting the call to action for the user to continue drawing the line chart.

<a href="#g-drawBar" id="g-drawBar">#</a> globals.<b>drawBar</b>

Sets the *text* denoting the call to action for the user to adjusting the bar chart.

<a href="#g-resultButtonText" id="g-resultButtonText">#</a> globals.<b>resultButtonText</b>

Sets the *text* denoting the button to reveal the correct answer.

<a href="#g-resultButtonTooltip" id="g-resultButtonTooltip">#</a> globals.<b>resultButtonTooltip</b>

Sets the *text* denoting the tooltip of the button to reveal the correct answer.

<a href="#g-showScore" id="g-showScore">#</a> globals.<b>showScore</b>

Determines if the score evaluation should be displayed or not. Default is *true*.

<a href="#g-scoreButtonText" id="g-scoreButtonText">#</a> globals.<b>scoreButtonText</b>

Sets the *text* denoting the button to reveal the total score.

<a href="#g-scoreButtonTooltip" id="g-scoreButtonTooltip">#</a> globals.<b>scoreButtonTooltip</b>

Sets the *text* denoting the tooltip of the button to reveal the total score.

<a href="#g-scoreTitle" id="g-scoreTitle">#</a> globals.<b>scoreTitle</b>

Sets the *text* denoting the the headline on top of the score evaluation.

<a href="#g-scoreHtml" id="g-scoreHtml">#</a> globals.<b>scoreHtml</b>

There are two ways to specify that property:
1. specify a *text* or *html* for any score:
```
var globals = { 
        ...
        scoreHtml: "Next time you can do better!",
    };
```
Sets the *text* or *html* shown after the total score is revealed.

2. specify a *text* or *html* depending on the score: 
```
var globals = { 
        ...
        scoreHtml: [{lower: 0, upper: 50, html: "<b>That wasn't much, was it??</b>"}, 
        {lower: 50, upper: 101, html: "<b>Excellent!!</b>"}],
    };
```
Sets the *text* or *html* based on the score. In this case, `globals.scoreHtml` is an `array` of `objects`. The array contains as many objects as there are intervalls. Each `object` defines the intervall with its lower and upper bound. It also contains an html property for the *text* or *html* to be displayed in this case.


### 2.3 The configuration object `question`

<a href="#q-data" id="q-data">#</a> question.<b>data</b>

Sets the value/ values which is/are the correct response for the question.
- In case a single value is the answer (which is re presented by a bar chart), `data` has to be initialized with the correct *number*.
- In case a sequence of values is the answer (which is represented by a line chart), `data` has to be initialized by an *array* of *objects*. Each *object* is a point in the sequence and has to be initialized by a key (which will be the x coordinate) and its value (which will be the y coordinate)
- In case multiple choice (of text) is the answer, `data` has to be initialized by an *array* of *objects*. Each *object* is a possible answer and has to be initialized by a key (which will be the possible answer) and a *boolean* value (which indicates if the answer is correct)

Note that the decimal separator has to denoted by a `.`(dot). The display, however, can be modified with `globals.default` (`.`(dot) vs `,`(comma)) 

```
// examples for setting question.data
question = { 
    ...
    // data for single value looks like this:
    data: 385, // or
    data: 2.545, // or

    // data for a sequence of values looks like this:
    data: [
          {"1998 (JP)": 32000}, 
          {"2002 (US)": 22000}, 
          {"2006 (IT)": 18000}, 
          {"2010 (CA)": 18500}, 
          {"2014 (RU)": 25000}, 
          {"2018 (CN)": 22400},
          ], // or

    data: [
          {"Mon": 32.0}, 
          {"Tue": 20.2}, 
          {"Wed": 18.7}, 
          {"Thu": 18.3}, 
          {"Fri": 25.2}, 
          {"Sat": 22.1},
          {"Son": 22.9},
          ], //or

    // data for multiple choice questions look like this:
    data: [
          {"San Francisco": false}, 
          {"Boston": false}, 
          {"New York": false}, 
          {"Paris": true},  
          ], // or

    data: [
          {"Mike Bostock": false}, 
          {"Jim Vallandingham": true}, 
          {"Amanda Cox": false}, 
          ],       
...};
```

<a href="#q-heading" id="q-heading">#</a> question.<b>heading</b>

Sets the *text* or *html* containing the question.

<a href="#q-subHeading" id="q-subHeading">#</a> question.<b>subHeading</b>

Sets the *text* or *html* below the `heading`.

<a href="#q-resultHtml" id="q-resultHtml">#</a> question.<b>resultHtml</b>

Sets the *text* or *html* after the user has drawn his guess and the correct result is shown.

<a href="#q-unit" id="q-unit">#</a> question.<b>unit</b>

Sets a *string* which is attached to the values of the y axis and the label of the tooltip when the user makes. 

```
// examples for setting question.unit
question = { 
    ...
    unit: "sec", // or
    unit: "Mio", // or
    unit: "US$", // or
    unit: "???", 
...};
```

<a href="#q-precision" id="q-precision">#</a> question.<b>precision</b>

Sets the number of decimal places. The default is 1.

<a href="#q-lastPointShownAt" id="q-lastPointShownAt">#</a> question.<b>lastPointShownAt</b>

Determines the last point shown for the line chart. The user guesses start from the next point.
Default value is the next to last point in the sequence. This leaves the user to guess just the last point. Any point but the last can be specified.
Is irrelevant for the bar chart.  

<a href="#q-yAxisMin" id="q-yAxisMin">#</a> question.<b>yAxisMin</b>

Sets the lowest value for the y axis. 
Default value is:
   - 0, if all values are positive numbers
   - Min(value) - *random number* * Min(value), if min(values) is a negative number. *random number* is a number between 0.4 and 1.0.

<a href="#q-yAxisMax" id="q-yAxisMax">#</a> question.<b>yAxisMax</b>

Sets the highest value for the y axis. 
Default value is:
   - Max(value) + *random number* * Max(value). *random number* is a number between 0.4 and 1.0.

<a href="#q-referenceValues" id="q-referenceValues">#</a> question.<b>referenceValues</b>

Sets reference values to be shown before the interaction starts. 

For the bar chart: `referenceValues` has to be initialized by an *array* of *objects*. Each *object* has two properties:
1. `text` (containing the label)
2. `value` (which contains the y coordinate).

E.g.:
```
question = {
        ...
        referenceValues: [
          {text: "right-handers (12.0 sec)", value: 12},
          {text: "right-handers2 (12.5 sec)", value: 12.5},
          {text: "right-handers3 (13 sec)", value: 13},
        ], 
```

`referenceValues` for the bar chart can be styled as follows:
```
<style>
      .question-referenceValue {
        color: red;
        stroke: red;
      }
</style>
```

For the line chart: `referenceValues` has to be initialized by an *array* of *objects*. Each *object* has three properties:
1. `text` (containing the label)
2. `textPosition` optional (which contains the offset on the path. Possible values are: `start`, `middle` and `end`. The default is `middle`)
3. `value` (which contains an *array* with the data for the line)

E.g.:
```
question = {
        ...
        referenceValues: [
          {text: "myLine", textPosition: "end", value: [
            {"1998": 12000}, 
            {"2002": 12000}, 
            {"2006": 8000}, 
            {"2010": 8500}, 
            {"2014": 15000}, 
            {"2018": 2400},
            ]
          },
          {text: "your Line", textPosition: "start", value: [
            {"2010": 28500}, 
            {"2014": 5000}, 
            {"2018": 16400},
            ]
          },
        ], 
```

`referenceValues` for the line chart can be styled as follows:
```
<style>
    .question-referenceValues.referenceLine.line-myLine {
        fill: deeppink;
        stroke: deeppink;
    }
</style>
```
The selector for `referenceValues` for the line chart is `.question-referenceValues.referenceLine`.
In case you want to style each line separately you the class `.line-`*the name of your line*. Any whitespaces in your name (= the text property) will be trimmed.

<a href="#q-referencShape" id="q-referenceShape">#</a> question.<b>referenceShape</b>

Sets the shape of the reference for the bar chart (single value).
Default value is "line", only alternative is "tick" which prevents overlapping.

## 3.0 Using a different font

The font of the quiz can be changed in the ```<head>``` of the html document by 
1. importing the new font 
2. assigning the font to the desired text elements 

Three possible choices are:
### 3.1 Using a different font for all text elements

```
<head>
    ...
    <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
    <style>
        .update-font, .tick text {
            font-family: 'Indie Flower', cursive;
            font-size: 1.5em;
        }
    </style>
</head>
```

### 3.2 Using a different font for all text elements but the axes 

```
<head>
    ...
    <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
    <style>
        .update-font {
            font-family: 'Indie Flower', cursive;
            font-size: 1.5em;
        }
    </style>
</head>
```

### 3.3 Using a different font for just the call-to-action text elements

```
<head>
    ...
    <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet">
    <style>
        .globals-drawLine, .globals-drawBar {
            font-family: 'Indie Flower', cursive;
            font-size: 1.5em;
        }
    </style>
</head>
```

### 3.4 Table with the css classes of the text elements

You can CSS style any text element by applying class selectors as referenced below:

| object key       | class1          | class2  |
| ------------- |:-------------|:-----|
| globals.header      | globals-header  | update-font |
| globals.subHeader     | globals-subHeader      |   update-font |
| globals.resultButtonText     | globals-resultButtonText     |   update-font |
| globals.resultButtonTooltip    | globals-resultButtonTooltip     |   update-font |
| globals.drawAreaTitle    | globals-drawAreaTitle     |   update-font |
| globals.drawLine    | globals-drawLine     |   update-font |
| globals.drawBar    | globals-drawBar     |   update-font |
| globals.scoreButtonText    | globals-scoreButtonText     |   update-font |
| globals.scoreButtonTooltip    | globals-scoreButtonTooltip     |   update-font |
| globals.scoreTitle    | globals-scoreTitle     |   update-font |
| globals.scoreHtml    | globals-scoreHtml     |   update-font |
| () ??? .scoreText    | globals-scoreText    |   update-font |
| question.heading | question-heading      |    update-font |
| question.subHeading | question-subHeading      |    update-font |
| question.resultHtml | question-resultHtml      |    update-font |
| question.referenceValues | question-referenceValues      |    update-font |
| (question.unit) ??? label | question-label      |    update-font |
| (multiple choice question) ??? label | question-multipleChoice      |    update-font |

## 4. Calculating the final score
The final score is calculated as follows:
- for each question a score is calculated by
    - (if line chart) 
        - compute the max possible distance for all points
        - give score (0 - 100) for this question based on absolute distances
    - (if bar chart) 
        - compute the max possible distance
        - give score (0 - 100) for this question based on absolute distance
- final score is mean of all individual scores

## 5. License  
This code is released under the [BSD license](https://github.com/EE2dev/you-draw-it//blob/master/LICENSE).
