import { Card, List, ListItem, Icon, Text, Bold, Flex, Title, Color, Button } from "@tremor/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition, faCircleCheck, faCodePullRequest, faScaleUnbalanced, faUser } from "@fortawesome/free-solid-svg-icons";
import { Extension, Repository, getLatestRelease, repositoryURL } from "interfaces";
import { faBitbucket, faGithub, faGitlab } from "@fortawesome/free-brands-svg-icons";

type Props = {
    ext: Extension
}

type DetailsItem = {
    name: string;
    icon: any;
    color: Color;
    text: string;
    link?: string;
};

function repositoryIcon(repository: Repository): IconDefinition {
    switch (repository.type) {
      case 'github':
        return faGithub
      case 'gitlab':
        return faGitlab
      case 'bitbucket':
        return faBitbucket
      case 'custom':
        return faCodePullRequest
    }
  }

export function DetailsCard({ ext }: Props) {
    var latest = getLatestRelease(ext);
    
    const details: DetailsItem[] = [
        {
            name: "Publisher",
            icon: function DetailsItemIcon() {
                return (
                    <FontAwesomeIcon icon={faUser} className="p-0.5 fa-fw" />
                )
            },
            color: "amber",
            text: ext.author.id,
            link: ext.website,
        },
        {
            name: "Compatible with",
            icon: function DetailsItemIcon() {
                return (
                    <FontAwesomeIcon icon={faCircleCheck} className="p-0.5 fa-fw" />
                )
            },
            color: "green",
            text: `FOSSBilling v${latest.min_fossbilling_version} and later`,
        },
        {
            name: "License",
            icon: function DetailsItemIcon() {
                return (
                    <FontAwesomeIcon icon={faScaleUnbalanced} className="p-0.5 fa-fw" />
                )
            },
            color: "blue",
            text: ext.license.name,
            link: ext.license.URL,
        },
        {
            name: "Source code",
            icon: function DetailsItemIcon() {
                return (
                    <FontAwesomeIcon icon={repositoryIcon(ext.source)} className="p-0.5 fa-fw" />
                )
            },
            color: "fuchsia",
            text: ext.source.repo,
            link: repositoryURL(ext.source),
        },
    ];

    return (
        <Card>
            <Title>Extension details</Title>
            <List className="mt-4">
                {details.map((detail) => (
                    <ListItem key={detail.name}>
                        <Flex justifyContent="start" className="truncate space-x-4">
                            <Icon
                                variant="light"
                                icon={detail.icon}
                                size="md"
                                color={detail.color}
                            />
                            <div className="truncate">
                                <Text className="truncate">
                                    <Bold>{detail.name}</Bold>
                                </Text>
                            </div>
                        </Flex>
                        {detail.link ? (
                            <a href={detail.link} target="_blank">
                                <Button variant="light">{detail.text}</Button>
                            </a>
                        ) : (
                            <Text>{detail.text}</Text>
                        )}
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}
