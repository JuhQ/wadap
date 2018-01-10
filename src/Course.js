import React from 'react';

const createCourseLink = code =>
  `https://courses.helsinki.fi/fi/${code.toLowerCase()}`;

const Course = props => (
  <p key={props.code}>
    <a href={createCourseLink(props.code)}>{props.name} ({props.credits}op)</a>
  </p>
);

Course.propTypes = {
  code: PropTypes.string,
  name: PropTypes.string,
  credits: PropTypes.number
};

Course.defaultProps = {
  code: null,
  name: null,
  credits: null
};

export default Course;
