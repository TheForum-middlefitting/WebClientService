import { TagCloud } from 'react-tagcloud'
import classes from "./Home.module.css"

const data = [
    { value: 'Java 11', count: 7 },
    { value: 'Spring Boot', count: 7 },
    { value: 'JUnit 5', count: 7 },
    { value: 'JPA', count: 7 },
    { value: 'React.js', count: 7 },
    { value: 'JavaScript', count: 7 },
    { value: 'Nodejs', count: 7 },
    { value: 'QueryDsl', count: 7 },
    { value: 'REST API', count: 7 },
    { value: 'MicroService', count: 7 },
    { value: 'Docker', count: 7 },
    { value: 'Jenkins', count: 7 },
    { value: 'MariaDB', count: 7 },
    { value: 'TypeScript', count: 7 },
    { value: 'JWT', count: 7 },
    { value: 'GitHub', count: 7 },
    { value: 'EC2', count: 7 },
    { value: 'RDS', count: 7 },
    { value: 'Bootstrap', count: 7 },
    // { value: 'REST Docs', count: 7 },
    // { value: 'JetBrains', count: 7 },
]

const customRenderer = (tag, size, color) => (
    <span
        key={tag.value}
        className={classes.wordCloud}
        style={{
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${size}em`,
            border: `2px solid ${color}`,
        }}
    >
    {tag.value}
  </span>
)
export default function FooterForm() {
    return (
        <div className={classes.auth}>
            <TagCloud tags={data} minSize={1} maxSize={5} renderer={customRenderer} onClick={tag => alert(`'${tag.value}' was selected!`)}/>
        </div>
    )
}
