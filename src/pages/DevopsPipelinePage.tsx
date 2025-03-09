import {Button, Checkbox, Col, Form, message, Row, Select, Table} from 'antd';
import React, {useState} from 'react';
import {ExtensionMessages} from 'src/config/extension-messages';
import type {Pipeline} from 'src/models/Pipeline';
import type {Project} from 'src/models/Project';
import {ServerUrl} from 'src/models/ServerUrl';
import {PipelineSearch} from './DevopsPipelineSearch';

const ProjectSelectForm = () => {
  const [tabs, setTabs] = React.useState<ServerUrl[]>([]);
  const [selectedTab, setSelectedTab] = React.useState<ServerUrl | undefined>();

  const [projects, setProjects] = useState<Project[]>([]);
  const [isProjectLoading, setIsProjectLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();

  React.useEffect(() => {
    chrome.runtime.sendMessage(
      {action: ExtensionMessages.GET_ALL_TABS},
      (response: {tabs: chrome.tabs.Tab[]}) => {
        if (response && response.tabs) {
          const urls = response.tabs
            .filter((tab) => typeof tab.url === 'string' && tab.url !== '')
            .map((tab) => {
              const activeTabUrl: string = tab.url!;

              // Regex to check if the tab is an Azure DevOps Cloud or on-premise server
              const azureDevOpsRegex =
                /https:\/\/(dev\.azure\.com|[a-zA-Z0-9-]*\.visualstudio\.com)/;
              const onPremiseDevOpsRegex =
                /https:\/\/(.*)devops(.*)\/([A-Za-z0-9-_]*)\/?/; // On-premise regex for TFS/DevOps

              if (azureDevOpsRegex.test(activeTabUrl!)) {
                // Azure DevOps Cloud (e.g., https://dev.azure.com/OrgName)
                const org = activeTabUrl!.split('/')[3];
                return new ServerUrl('https://dev.azure.com', org);
              }
              if (onPremiseDevOpsRegex.test(activeTabUrl!)) {
                const org = activeTabUrl!.split('/')[3];
                return new ServerUrl(
                  `https://${activeTabUrl.split('/')[2]}`,
                  org,
                );
              }
              return null;
            })
            .filter((serverUrl) => serverUrl !== null);

          setTabs(urls);
        } else {
          message.error('Could not retrieve tabs.');
        }
      },
    );
  }, []);

  React.useEffect(() => {
    setIsProjectLoading(true);
    chrome.runtime.sendMessage(
      {action: ExtensionMessages.GET_ALL_PROJECTS, server: selectedTab},
      (response: {projects: Project[]}) => {
        setProjects(
          response.projects.sort((a, b) => a.name.localeCompare(b.name)),
        );
        setIsProjectLoading(false);
      },
    );
  }, [selectedTab]);

  const [pipelines, setPipelines] = React.useState<Pipeline[]>([]);
  const [filteredPipelines, setFilteredPipelines] = useState<Pipeline[]>([]);
  const [, setIsPipelineLoading] = React.useState(true);

  const handleProjectChange = React.useCallback(
    async (value: number) => {
      const project = projects.find(({id}) => id === value);
      if (!project) {
        return;
      }
      setSelectedProject(project);
      setIsPipelineLoading(true);
      chrome.runtime.sendMessage(
        {
          action: ExtensionMessages.GET_ALL_PIPELINES,
          project,
          server: selectedTab,
        },
        (response: {pipelines: Pipeline[]}) => {
          setPipelines(response.pipelines ?? []);
          setFilteredPipelines(response.pipelines ?? []);
          setIsPipelineLoading(false);
        },
      );
    },
    [projects, selectedTab],
  );

  const handlePipelineSearch = React.useCallback(
    ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
      setFilteredPipelines(
        pipelines.filter((pipeline) =>
          pipeline.name.toLowerCase().includes(value.toLowerCase()),
        ),
      );
    },
    [pipelines],
  );

  const [selectedPipelines, setSelectedPipelines] = useState<number[]>([]);
  const [isTriggering, setIsTriggering] = React.useState(false);

  const handleSubmit = React.useCallback(async () => {
    setIsTriggering(true);
    for (const pipelineId of selectedPipelines) {
      await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
          {
            action: ExtensionMessages.TRIGGER_PIPELINE,
            project: selectedProject,
            pipelineId,
            server: selectedTab,
          },
          (response: {success: boolean}) => {
            if (response.success) {
              resolve('Pipeline triggered successfully.');
              return;
            }
            reject('Failed to trigger pipeline.');
          },
        );
      });
    }
    setIsTriggering(false);
  }, [selectedPipelines, selectedProject, selectedTab]);

  const height = window.innerHeight - 64 - 8 * 2 - 86 - 55;

  const firstColumnTitle = (
    <Checkbox
      checked={
        selectedPipelines.length === filteredPipelines.length &&
        filteredPipelines.length > 0
      }
      indeterminate={
        selectedPipelines.length > 0 &&
        selectedPipelines.length < filteredPipelines.length
      }
      onChange={(e) => {
        setSelectedPipelines(
          (e.target.checked ? [...filteredPipelines] : []).map((p) => p.id),
        );
      }}
    />
  );

  return (
    <>
      <Form layout="vertical">
        <Row gutter={12}>
          <Col span={6}>
            <Form.Item label="Server">
              <Select
                placeholder="Select an Azure DevOps Server"
                onChange={(value) => {
                  const tab = tabs.find((t) => t.fullUrl === value);
                  if (tab) {
                    setSelectedTab(tab);
                  }
                }}
                showSearch={true}
                filterOption={(input, option) =>
                  (option?.label as string | undefined)
                    ?.toLowerCase()
                    .startsWith(input.toLowerCase()) ?? false
                }
                value={selectedTab?.fullUrl}
                options={tabs.map((tab) => ({
                  value: tab.fullUrl,
                  label: tab.fullUrl,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Project">
              <Select
                disabled={!selectedTab}
                loading={selectedTab ? isProjectLoading : false}
                placeholder="Select an Azure DevOps Server"
                onChange={handleProjectChange}
                showSearch={true}
                filterOption={(input, option) =>
                  (option?.label as string | undefined)
                    ?.toLowerCase()
                    .startsWith(input.toLowerCase()) ?? false
                }
                value={selectedProject?.id}
                options={projects.map((project) => ({
                  value: project.id,
                  label: project.name,
                }))}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Search Pipelines">
              <PipelineSearch
                onChange={handlePipelineSearch}
                disabled={!selectedProject}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Actions">
              <Button
                loading={isTriggering}
                type="primary"
                onClick={handleSubmit}
                disabled={!selectedProject || !selectedPipelines.length}>
                Trigger selected pipelines
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Row gutter={12}>
        <Col span={selectedPipelines.length > 0 ? 12 : 24}>
          <Table
            virtual={true}
            scroll={{
              y: height,
            }}
            rowKey="id"
            dataSource={filteredPipelines}
            pagination={false}
            columns={[
              {
                title: firstColumnTitle,
                dataIndex: 'id',
                width: 80,
                className: 'text-center align-center',
                key: 'id',
                render: (id: number) => (
                  <Checkbox
                    checked={selectedPipelines.includes(id)}
                    onChange={(e) => {
                      setSelectedPipelines(
                        e.target.checked
                          ? [id, ...selectedPipelines]
                          : selectedPipelines.filter((i) => i !== id),
                      );
                    }}
                  />
                ),
              },
              {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
              },
              {
                title: 'Folder',
                dataIndex: 'folder',
                key: 'folder',
              },
              {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
              },
            ]}
          />
        </Col>
        {selectedPipelines.length > 0 && (
          <Col span={12}>
            <Table
              virtual={true}
              scroll={{
                y: height,
              }}
              rowKey="id"
              dataSource={pipelines.filter((pipeline) =>
                selectedPipelines.includes(pipeline.id),
              )}
              pagination={false}
              columns={[
                {
                  title: 'ID',
                  dataIndex: 'id',
                  width: 80,
                  className: 'text-center align-center',
                  key: 'id',
                },
                {
                  title: 'Name',
                  dataIndex: 'name',
                  key: 'name',
                },
                {
                  title: 'Folder',
                  dataIndex: 'folder',
                  key: 'folder',
                },
                {
                  title: 'Description',
                  dataIndex: 'description',
                  key: 'description',
                },
              ]}
            />
          </Col>
        )}
      </Row>
    </>
  );
};

export default ProjectSelectForm;
