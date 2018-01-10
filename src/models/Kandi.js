import {negate, isEmpty} from 'lodash';
import {filter} from 'lodash/fp';

const courses = [
  {
    code: 'MFK-M101A', name: 'Lukiomatematiikan kertaus', credits: 2, prerequisites: null
  },
  {
    code: 'TKT50003', name: 'Tietokone työvälineenä', credits: 1, prerequisites: null
  },
  {
    code: 'DIGI-100A', name: 'Opiskelijan digitaidot: orientaatio (Kumpula)', credits: 2, prerequisites: null
  },
  {
    code: '581328', name: 'Tietokantojen perusteet', credits: 5, prerequisites: null
  },
  {
    code: 'A582104', name: 'Avoin yo: Ohjelmistotekniikan menetelmät', credits: 5, prerequisites: null
  },
  {
    code: 'A581325', name: 'Avoin yo: Ohjelmoinnin perusteet', credits: 5, prerequisites: null
  },
  {
    code: 'A582103', name: 'Avoin yo: Ohjelmoinnin jatkokurssi', credits: 5, prerequisites: ['A581325']
  },
  {
    code: 'TKT20006', name: 'Ohjelmistotuotanto', credits: 6, prerequisites: null
  },
  {
    code: 'TKT10001', name: 'Johdatus tietojenkäsittelytieteeseen', credits: 5, prerequisites: null
  },
  {
    code: 'TKT20011', name: 'Aineopintojen harjoitustyö: Tietokantasovellus (periodi II)', credits: 4, prerequisites: ['581328', 'A582104']
  },
  {
    code: '582350', name: 'Ohjelmointihaasteita I', credits: 1, prerequisites: null
  },
  {
    code: '610046', name: 'Johdatus mediakasvatukseen, 3. periodi', credits: 3, prerequisites: null
  },
  {
    code: 'KIK-LG208', name: 'Ohjelmointia lingvisteille', credits: 5, prerequisites: null
  },
  {
    code: 'MAT12003', name: 'Todennäköisyyslaskenta I', credits: 5, prerequisites: null
  },
  {
    code: 'MAT20004', name: 'Latex kurssi', credits: 1, prerequisites: null
  },
  {
    code: 'TKT20001', name: 'Tietorakenteet ja algoritmit', credits: 10, prerequisites: ['MAT11001', 'A582103']
  },
  {
    code: 'TKT21008', name: 'Programming in C', credits: 5, prerequisites: null
  },
  {
    code: 'TKT21012', name: 'Algoritmit ongelmanratkaisussa', credits: 10, prerequisites: ['TKT20001']
  },
  {
    code: 'MAT11001', name: 'Johdatus yliopistomatematiikkaan-Syksy', credits: 5, prerequisites: null
  },
  {
    code: 'TKT20007', name: 'Ohjelmistotuotantoprojekti', credits: 10, prerequisites: ['TKT20006']
  },
  {
    code: 'TKT21009', name: 'Full Stack -websovelluskehitys', credits: 5, prerequisites: null
  },
  {
    code: 'TKT21010', name: 'Full Stack -websovelluskehitys harjoitustyö', credits: 1, prerequisites: ['TKT21009']
  },
  {
    code: 'TKT20013', name: 'Kandidaatin tutkielma', credits: 6, prerequisites: null
  },
  {
    code: 'TKT10005', name: 'Tietokoneen toiminta', credits: 5, prerequisites: null
  },
  {
    code: 'TKT20003', name: 'Käyttöjärjestelmät', credits: 5, prerequisites: null
  },
  {
    code: '', name: '', credits: 5, prerequisites: null
  },
  {
    code: '', name: '', credits: 5, prerequisites: null
  },
  {
    code: '', name: '', credits: 5, prerequisites: null
  },
];

const completed = [
  'MFK-M101A',
  'TKT50003',
  'DIGI-100A',
  '581328',
  'A582104',
  'A581325',
  'A582103',
  'TKT20006',
  'TKT10004',
  'TKT10001',
  'TKT20011',
  // 'TKT21009',
  // 'TKT20007',
  '',
];

const failed = [
  'MAT11001'
];

const filterEmpty = filter(negate(isEmpty));

export const getCourses = () =>
  new Promise(resolve => resolve(courses))
    .then(filter(({name}) => !isEmpty(name)));

export const getCompletions = () =>
  new Promise(resolve => resolve(completed))
    .then(filterEmpty);

export const getFailures = () =>
  new Promise(resolve => resolve(failed))
    .then(filterEmpty);
