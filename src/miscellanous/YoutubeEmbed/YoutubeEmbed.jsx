import React from 'react'

const YoutubeEmbed =  (props)  => {

    if(props.link==='') return <div></div>;

    const embedId = props.link.split('=')[1];

    return(
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
    )
    }

  export default YoutubeEmbed;