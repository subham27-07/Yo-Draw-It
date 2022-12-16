var pymChild = null;
var pymChild = new pym.Child();



var data = [
  // {"year": 2001,    "rating": 31.4},
  // {"year": 2002,    "rating": 32.6},
  // {"year": 2003,    "rating": 34.5},
  // {"year": 2004,    "rating": 35.5},

{'year': 2010, 'rating': 308},
{'year': 2011, 'rating': 308},
{'year': 2012, 'rating': 290},
{'year': 2013, 'rating': 289},
{'year': 2014, 'rating': 261},
{'year': 2015, 'rating': 255},
{'year': 2016, 'rating': 245},

]


var winwidth = parseInt(d3.select('#chart-body-4').style('width'))

var winheight = parseInt(d3.select('#chart-body-4').style('height'))


var ƒ = d3.f

var sel = d3.select('#chart-body-4').html('')
var c = d3.conventions({
  parentSel: sel, 
  totalWidth: winwidth, 
  height:  250, 
  margin: {left: 30, right: 30, top: 5, bottom: 30}
})

pymChild.sendHeight();

c.svg.append('rect').at({width: c.width, height: c.height, opacity: 0})

// c.svg.append('circle').attr('cx',c.totalWidth*.279-13).attr('cy',c.height*.285).attr('r', 5).style('fill', '#FE64A3')

c.svg.append('circle').attr('cx',c.totalWidth-winwidth).attr('cy',c.height*.16).attr('r', 5).attr('class', 'intro-dot')

c.svg.append('text').attr('x',c.totalWidth-winwidth+5).attr('y',c.height*.14).text('Start dragging here').attr('class','intro-text')


c.x.domain([2010, 2016])
c.y.domain([200, 330])

c.xAxis.ticks(4).tickFormat(ƒ())
c.yAxis.ticks(5).tickFormat(d =>  d3.format(",.3r")(d))

var area = d3.area().x(ƒ('year', c.x)).y0(ƒ('rating', c.y)).y1(c.height)
var line = d3.area().x(ƒ('year', c.x)).y(ƒ('rating', c.y))

var clipRect = c.svg
  .append('clipPath#clip-4')
  .append('rect')
  .at({width: c.x(2010), height: c.height})

var correctSel = c.svg.append('g').attr('clip-path', 'url(#clip-4)')

correctSel.append('path.area').at({d: area(data)})
correctSel.append('path.line').at({d: line(data)})
yourDataSel = c.svg.append('path#your-line-4').attr('class', 'your-line')

c.drawAxis()


yourData = data
  .map(function(d){ 
    return {year: d.year, rating: d.rating, defined: 0} })
  .filter(function(d){
    if (d.year == 2010) d.defined = true
    return d.year >= 2010
  })


var completed = false

var drag = d3.drag()
  .on('drag', function(){
    d3.selectAll('.intro-text').style('visibility', 'hidden')
    var pos = d3.mouse(this)
    var year = clamp(2010, 2016, c.x.invert(pos[0]))

    var rating = clamp(0, c.y.domain()[1], c.y.invert(pos[1]))

    yourData.forEach(function(d){
      if (Math.abs(d.year - year) < .5){
        d.rating = rating
        d.defined = true
      }
    })

    yourDataSel.at({d: line.defined(ƒ('defined'))(yourData)})

    if (!completed && d3.mean(yourData, ƒ('defined')) == 1){
      console.log(yourData[yourData.length-1].rating)
      completed = true
      clipRect.transition().duration(1000).attr('width', c.x(2016))
      d3.select('#answer-4').style('visibility', 'visible').html("<div>You guessed <p class='your-pink'>"+ d3.format(",.3r")(yourData[yourData.length-1].rating) + "</p> per 100,000 for 2016.</div><div>The real value was <p class='your-pink'>"+d3.format(",.3r")(data[6].rating)+" </p> per 100,000.</div>")
      d3.select('#explain-4').style('visibility', 'visible').style('opacity', 1)
      pymChild.sendHeight();

    }
  })

c.svg.call(drag)



function clamp(a, b, c){ return Math.max(a, Math.min(b, c)) }