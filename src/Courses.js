import React, {Component} from 'react';
import {map, includes, extend, filter, orderBy} from 'lodash';
import {sumBy} from 'lodash/fp';
import './Courses.css';
import {getCourses, getCompletions, getFailures} from './models/Kandi';

const createCourseLink = code =>
  `https://courses.helsinki.fi/fi/${code.toLowerCase()}`;

const progress = (a, b) =>
  Number(((a / b) * 100).toFixed(2));

const getTotalCredits = sumBy('credits');

const renderCourse = (course) => {
  const completed = course.completed && 'completed';
  const failed = course.failed && 'failed';
  const className = completed || failed;

  return (
    <p key={course.code} className={className || ''}>
      <a href={createCourseLink(course.code)}>{course.name} ({course.credits}op)</a>
    </p>
  );
};

export default class Courses extends Component {
  constructor() {
    super();
    this.state = {
      courses: [],
      completions: []
    };
  }

  componentWillMount() {
    Promise
      .all([getCourses(), getCompletions(), getFailures()])
      .then(([courses, completions, failed]) => {
        const coursesWithCompletion = map(courses, course =>
          extend({}, course, {
            completed: includes(completions, course.code),
            failed: includes(failed, course.code),
          })
        );

        return [coursesWithCompletion, completions, failed];
      })
      .then(([courses, completions]) => {
        this.setState({courses, completions});
      });
  }

  renderCourseList() {
    const courses = orderBy(this.state.courses, ['failed', 'completed'], ['asc', 'asc']);
    return (
      <div className="App-intro">
        <div>
          <div>
            <strong>Kurssit:</strong>
            {
              map(courses, renderCourse)
            }
          </div>
          <div>
            <p>
              <strong>Suoritukset</strong><br />
              {this.state.completions.join(',')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const totalCredits = getTotalCredits(filter(this.state.courses, 'completed'));
    const courseProgress = progress(totalCredits, 180);

    return (
      <div className="Courses">
        <header className="Courses-header" style={{background: `linear-gradient(90deg, rgb(24, 129, 204) ${courseProgress}%, #222 ${courseProgress}%)`}}>
          <p>
            Opintopisteistä suoritettu: {totalCredits} / 180
          </p>
          <p>
            Progress: {courseProgress}%
          </p>
        </header>
        {this.state.courses.length > 0 && this.renderCourseList()}

        <img src="https://www.cs.helsinki.fi/webfm_send/1407" alt="" />
      </div>
    );
  }
}
