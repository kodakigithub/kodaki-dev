'use client';

interface AsciiArtAnimatorProps {
    art: string;
    className?: string;
    style?: React.CSSProperties;
}

const AsciiArtAnimator = ({
    art,
    className = '',
    style = {}
}: AsciiArtAnimatorProps) => {
    return (
        <pre
            className={`${className} text-gradient-flow`}
            style={style}
            aria-hidden="true"
        >
            {art}
        </pre>
    );
};

export default AsciiArtAnimator;
