var Post = React.createClass({
  rawMarkup: function(){
    var rawMarkup = marked(this.props.data.excerpt, {sanitize: false})
    return { __html: rawMarkup }
  },
	render: function(){
		return(
				<article className="post-abstract">
					<h1><a href={ this.props.data.url }>{ this.props.data.title }</a></h1>
					<span className='meta'>{ this.props.data.date }</span>
					<div className='post' dangerouslySetInnerHTML={ this.rawMarkup() } />
          <div className="read-more-container">
            <a className="read-more" href={ this.props.data.url }>Read More &#8594;</a>
          </div>
        </article>
			);
	}
});

var FilterOption = React.createClass({
  classForSelectionState: function(){
    return (this.props.isSelected ? "is-selected" : "")
  },

  render: function(){
    var cssClass = this.classForSelectionState()
    return(
      <a className={"filter-option " + cssClass } onClick={ this.props.onClick }>{this.props.children}</a>
    );
  }
});

var PostFilterByCatagories = React.createClass({
  render: function() {
    var self = this;
    var filterOptions = this.props.filterOptions;
    var filterOptionNodes = filterOptions.map(function(filterOption){
      return <FilterOption isSelected={filterOption.isSelected} onClick={ function(e) {self.props.handleClick(filterOption.name)} }>{filterOption.name}</FilterOption>
    });

    return(
      <header className="posts-by-catagories-filter">
        {filterOptionNodes}
      </header>
    );
  }
});

var PostList = React.createClass({
	loadPostsFromServer: function(url){
  	$.ajax({
      url: url,
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
    return {filterOptions: this.filterOptions("Code"), data: []}
  },
  componentDidMount: function() {
  	this.loadPostsFromServer("/index.json")
  },

  filterOptions: function(selectedFilterName){

    var filterOptions = [ 
     {name: "Code", isSelected: false},
     {name: "Poetry & Essays", isSelected: false},
     {name: "Projects", isSelected: false} ]

    var isSelectedOption = function(filterOption) {return filterOption.name == selectedFilterName}
    filterOptions.find(isSelectedOption).isSelected = true;

    return filterOptions;
  },

  handleClick: function(filterName) {
    this.setState({filterOptions: this.filterOptions(filterName)});
    this.loadPostsFromServer("/"+filterName+"/index.json");
  },

  render: function() {
  	var postData = this.state.data;
  	var postNodes = postData.map(function(post){
  		return <Post data={ post }/>
  	});
    return (
    	<div>
        <PostFilterByCatagories filterOptions={this.state.filterOptions} handleClick={this.handleClick}/>
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
