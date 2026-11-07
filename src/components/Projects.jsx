import { useState } from 'react'
import { portfolio, projects, PROJECT_STATUSES } from '../data/portfolio'
import Icon from './Icon'

function isWebUrl(value) {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function ProjectImage({ src, title }) {
  const [failedSource, setFailedSource] = useState(null)

  if (!src || failedSource === src) {
    return (
      <div className="project-image project-image-placeholder" aria-hidden="true">
        <Icon name="code" size={36} />
      </div>
    )
  }

  return (
    <img
      className="project-image"
      src={src}
      alt={`${title} preview`}
      loading="lazy"
      width="640"
      height="400"
      onError={() => setFailedSource(src)}
    />
  )
}

export default function Projects() {
  return (
    <section className="section projects-section" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="section-kicker">Selected work</p>
        <h2 className="section-title" id="projects-title">A portfolio in progress.</h2>
      </div>

      {projects.length === 0 ? (
        <div className="projects-empty">
          <div className="empty-icon" aria-hidden="true">
            <Icon name="folder" size={32} />
          </div>
          <h3>Projects are on the way.</h3>
          <p>I'm currently building practical applications to showcase here.</p>
          <a
            className="text-link"
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View my GitHub profile (opens in a new tab)"
          >
            View my GitHub <Icon name="arrow-up-right" size={17} />
          </a>
        </div>
      ) : (
        <div className="project-grid">
          {projects.map((project, index) => {
            const status = Object.hasOwn(PROJECT_STATUSES, project.status)
              ? project.status
              : 'planned'

            return (
              <article className="project-card" key={`${project.title}-${index}`}>
                <ProjectImage src={project.image} title={project.title} />
                <div className="project-card-body">
                  <span className="project-status" data-status={status}>
                    {PROJECT_STATUSES[status]}
                  </span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.techStack?.length > 0 && (
                    <ul className="project-stack" aria-label="Project technologies">
                      {project.techStack.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>
                  )}
                  {(isWebUrl(project.githubUrl) || isWebUrl(project.demoUrl)) && (
                    <div className="project-links">
                      {isWebUrl(project.githubUrl) && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          aria-label={`${project.title} source code (opens in a new tab)`}>
                          <Icon name="github" size={17} /> Source code
                        </a>
                      )}
                      {isWebUrl(project.demoUrl) && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                          aria-label={`${project.title} demo (opens in a new tab)`}>
                          View demo <Icon name="arrow-up-right" size={17} />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
