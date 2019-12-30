import React, {Component} from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'


class App extends Component {
    constructor() {
        super()
        this.state = {
          loading:false,
          quote: "",
          author:"",

        }
         this.changeQuote = this.changeQuote.bind(this);
    }
    changeQuote() {
      this.fetchData()
    }
    fetchData() {
      fetch(`https://type.fit/api/quotes`)
        .then(response => response.json())
        .then(data =>{
          //console.log(data[1246].text)
          let quoteNum = Math.floor(Math.random() * data.length) //quote number
          this.setState({
            quote: data[quoteNum].text,
            loading: false,
            author:data[quoteNum].author
          })
        })
    }
    componentDidMount() {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
      document.body.appendChild(script);
      this.setState({
        loading:true
      })
      this.fetchData()
    }

    render() {

      const quote = this.state.loading ? "loading..." : this.state.quote;
      const author = this.state.loading ? "loading..." : this.state.author;
      const parentContainerStyles = {
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'table',
          textAlign: 'center',
          justifyContent:"center",
          alignItems:"center"
          //border: '4 solid #fff'
        };
        const subContainerStyles = {
          position: 'relative',
          height: '100%',
          width: '100%',
          display: 'table-cell',
          verticalAlign: 'middle'
        };
        return (
            <Card style={parentContainerStyles} className={"text-center"}>
              <Card.Body style={subContainerStyles}>
              <div id="quote-box">
                <h1 id="text">{quote}</h1>
                <h5 id="author">{author}</h5>
                <a id='tweet-quote' href={`https://twitter.com/intent/tweet?text=${this.quote} ${this.author}`} target='_blank' title="Post this quote on twitter!">
                  <button type="button"
                className="btn btn-dark btn-lg" id="">
                Tweet Me!
                  </button >
                </a>
                <button type="button" onClick={this.changeQuote}
              className="btn btn-dark btn-lg" id="new-quote">
              Change Me!
                </button>
              </div>
              </Card.Body>
            </Card>
        )
    }
}

export default App
