import { TagCloud } from 'react-tagcloud'
import classes from "./Home.module.css"

const data = [
    { value: 'Java 11', count: 38 },
    { value: 'Spring Boot', count: 38 },
    { value: 'JUnit 5', count: 30 },
    { value: 'JPA', count: 30 },
    { value: 'React.js', count: 30 },
    { value: 'Javascript', count: 30 },
    { value: 'Nodejs', count: 28 },
    { value: 'QueryDsl', count: 27 },
    { value: 'REST API', count: 25 },
    { value: 'MicroService', count: 25 },
    { value: 'Docker', count: 25 },
    { value: 'Jenkins', count: 22 },
    { value: 'MySQL', count: 18 },
    { value: 'TypeScript', count: 17 },
    { value: 'JWT', count: 15 },
    { value: 'GitHub', count: 15 },
    { value: 'AWS', count: 15 },
    { value: 'REST Docs', count: 11 },
    { value: 'JetBrains', count: 7 },
]

const customRenderer = (tag, size, color) => (
    <span
        key={tag.value}
        className={classes.wordCloud}
        style={{
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${size * 1.5}em`,
            border: `2px solid ${color}`,
        }}
    >
    {tag.value}
  </span>
)
export default function Home() {
    return (
        <div className={classes.auth}>
            <TagCloud tags={data} minSize={1} maxSize={5} renderer={customRenderer} onClick={tag => alert(`'${tag.value}' was selected!`)}/>
        </div>
    )
}
