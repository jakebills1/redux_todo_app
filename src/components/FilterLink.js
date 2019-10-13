import React from "react";
class FilterLink extends React.Component {
  render() {
    const { filter, children, currentFilterState, setFilter } = this.props;
    if (filter === currentFilterState) {
      return <span>{children}</span>;
    }
    return (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          setFilter(filter);
        }}
      >
        {children}
      </a>
    );
  }
}
export default FilterLink;
