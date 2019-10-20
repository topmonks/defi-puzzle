import React from 'react';
import cn from 'classnames';

export default function Headline({
    primary,
    secondary,
    hero,
    logo,
    modal,
    children,
}) {
    let Tag = 'h3';
    if (primary || logo) Tag = 'h1';
    else if (secondary || hero) Tag = 'h2';

    return (
        <Tag
            className={cn(
                'headline',
                primary && 'headline--primary',
                secondary && 'headline--secondary',
                logo && 'headline--logo',
                hero && 'headline--hero',
                modal && 'headline--modal',
            )}
        >
            {children}
        </Tag>
    );
}
