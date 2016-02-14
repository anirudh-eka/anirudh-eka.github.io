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
	loadPostsFromServer: function(filterName){
    var url = "/"+filterName+"/index.json"
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

  loadFilterOptionsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(filterOptions) {
        this.setFilterOptions(filterOptions)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

	getInitialState: function() {
    return {filterOptions: [], data: []}
  },
  componentDidMount: function() {
    this.loadFilterOptionsFromServer()
  },

  getSelectedFilterOptionName: function() {
    var isSelected = function(filterOption) {return filterOption.isSelected == true}
    return this.state.filterOptions.find(isSelected).name;
  },

  setFilterOptions: function(filterOptions){
    this.setState({filterOptions: filterOptions});
    this.loadPostsFromServer(this.getSelectedFilterOptionName());
  },

  selectFilterOption: function(selectedFilterName){
    var filterOptions = this.state.filterOptions;

    var unselectOption = function(filterOption) {filterOption.isSelected = false};
    filterOptions.map(unselectOption);

    var isOptionToBeSelected = function(filterOption) {return filterOption.name == selectedFilterName}
    filterOptions.find(isOptionToBeSelected).isSelected = true;

    this.setFilterOptions(filterOptions)
  },

  render: function() {
  	var postData = this.state.data;
  	var postNodes = postData.map(function(post){
  		return <Post data={ post }/>
  	});
    return (
    	<div>
        <PostFilterByCatagories filterOptions={this.state.filterOptions} handleClick={this.selectFilterOption}/>
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
