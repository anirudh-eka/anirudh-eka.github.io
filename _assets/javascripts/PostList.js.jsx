var Post = React.createClass({
  rawMarkup: function(){
    var rawMarkup = marked(this.props.data.excerpt, {sanitize: false})
    return { __html: rawMarkup }
  },
	render: function(){
		return(
				<div>
					<h1><a href={ this.props.data.url }>{ this.props.data.title }</a></h1>
					<span className='meta'>{ this.props.data.date }</span>
					<div className='post' dangerouslySetInnerHTML={ this.rawMarkup() } />
          <div className="read-more-container">
            <a className="read-more" href={ this.props.data.url }>Read More &#8594;</a>
          </div>
        </div>
			);
	}
});

var PostList = React.createClass({
	loadPostsFromServer: function(){
  	$.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
	getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
  	this.loadPostsFromServer()
  	// setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  render: function() {
  	var postData = this.state.data;
  	var postNodes = postData.map(function(post){
  		return <Post data={ post }/>
  	});
    return (
    	<div>
    		{postNodes}
    	</div>
    );
  }
});

var initPostList = function() {
  ReactDOM.render(
    <PostList url="/index.json"/>,
    document.getElementById('container')
  );  
}
