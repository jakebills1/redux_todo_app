import React from "react";
class FilterLink extends React.Component {
  render() {
    const { filter, children, currentFilterState, setFilter } = this.props;
    if (filter === currentFilterState) {
      return <span>{children}</span>;
    }
    return (
      <div
        style={{
          width: "auto",
          height: "auto",
          border: "1px solid blue",
          display: "inline-block"
        }}
        onClick={e => {
          e.preventDefault();
          setFilter(filter);
        }}
      >
        {children}
      </div>
    );
  }
}
export default FilterLink;
