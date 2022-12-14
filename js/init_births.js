var pymChild = null;
var pymChild = new pym.Child();



var data = [
  // {"year": 2001,    "birth": 31.4},
  // {"year": 2002,    "birth": 32.6},
  // {"year": 2003,    "birth": 34.5},
  // {"year": 2004,    "birth": 35.5},
{'year': 2005, 'birth': 55},
{'year': 2006, 'birth': 51},
{'year': 2007, 'birth': 53},
{'year': 2008, 'birth': 60},
{'year': 2009, 'birth': 53},

{'year': 2010, 'birth': 51},
{'year': 2011, 'birth': 50},
{'year': 2012, 'birth': 52},
{'year': 2013, 'birth': 47},
{'year': 2014, 'birth': 48},
{'year': 2015, 'birth': 48},
{'year': 2016, 'birth': 46}

]


var winwidth = parseInt(d3.select('#chart-body-4').style('width'))

var winheight = parseInt(d3.select('#chart-body-4').style('height'))


var ƒ = d3.f

var sel = d3.select('#chart-body-4').html('')
var c = d3.conventions({
  parentSel: sel, 
  totalWidth: winwidth, 
  height:  250, 
  margin: {left: 50, right: 50, top: 5, bottom: 30}
})

pymChild.sendHeight();

c.svg.append('rect').at({width: c.width, height: c.height, opacity: 0})

c.svg.append('circle').attr('cx',c.totalWidth*.32-13).attr('cy',c.height*.48).attr('r', 5).attr('class', 'intro-dot')

c.svg.append('text').attr('x',c.totalWidth*.32-5).attr('y',c.height*.475).text('Start dragging here').attr('class','intro-text')


c.x.domain([2005, 2016])
c.y.domain([40, 65])

c.xAxis.ticks(4).tickFormat(ƒ())
c.yAxis.ticks(5).tickFormat(d =>  d3.format(",.3r")(d))

var area = d3.area().x(ƒ('year', c.x)).y0(ƒ('birth', c.y)).y1(c.height)
var line = d3.area().x(ƒ('year', c.x)).y(ƒ('birth', c.y))

var clipRect = c.svg
  .append('clipPath#clip-4')
  .append('rect')
  .at({width: c.x(2009)-2, height: c.height})

var correctSel = c.svg.append('g').attr('clip-path', 'url(#clip-4)')

correctSel.append('path.area').at({d: area(data)})
correctSel.append('path.line').at({d: line(data)})
yourDataSel = c.svg.append('path#your-line-4').attr('class', 'your-line')

c.drawAxis()


yourData = data
  .map(function(d){ 
    return {year: d.year, birth: d.birth, defined: 0} })
  .filter(function(d){
    if (d.year == 2009) d.defined = true
    return d.year >= 2009
  })


var completed = false

var drag = d3.drag()
  .on('drag', function(){
    d3.selectAll('.intro-text').style('visibility', 'hidden')
    var pos = d3.mouse(this)
    var year = clamp(2010, 2016, c.x.invert(pos[0]))

    var birth = clamp(0, c.y.domain()[1], c.y.invert(pos[1]))

    yourData.forEach(function(d){
      if (Math.abs(d.year - year) < .5){
        d.birth = birth
        d.defined = true
      }
    })

    yourDataSel.at({d: line.defined(ƒ('defined'))(yourData)})

    if (!completed && d3.mean(yourData, ƒ('defined')) == 1){
      completed = true
      clipRect.transition().duration(1000).attr('width', c.x(2016))
      d3.select('#answer-4').style('visibility', 'visible').html("<div>You guessed <p class='your-pink'>"+ d3.format(",.3r")(yourData[yourData.length-1].birth) + "</p> percent for 2016.</div><div>The real value was <p class='your-pink'>"+d3.format(",.3r")(data[11].birth)+" </p> percent.</div>")
      d3.select('#explain-4').style('visibility', 'visible').style('opacity', 1)
      pymChild.sendHeight();

    }
  })

c.svg.call(drag)



function clamp(a, b, c){ return Math.max(a, Math.min(b, c)) }