
import React from 'react';
import { applyFilter } from '../util/arrays';
import VolumeControl from './Fields/VolumeControl';
import MuteControl from './Fields/MuteControl';
import LatencyControl from './Fields/LatencyControl';
import TextField from './Fields/TextField';
import SelectField from './Fields/SelectField';

const SnapcastClients = ({ actions, group, groups, show_disconnected_clients }) => {
  if (!show_disconnected_clients && group.clients) {
    var clients = applyFilter('connected', true, group.clients);
  } else {
    var { clients } = group;
  }

  if (!clients || clients.length <= 0) {
    return <p className="no-results">No clients</p>;
  }

  return (
    <div className="list snapcast__clients">
      {
        clients.map((client) => {
          let class_name = 'list__item list__item--no-interaction snapcast__client';
          if (client.connected) {
            class_name += ' snapcast__client--connected';
          } else {
            class_name += ' snapcast__client--disconnected';
          }

          return (
            <div className={class_name} key={client.id}>
              <label className="field field--condensed">
                <div className="name">
                  Name
                  {!client.connected && ' (disconnected)'}
                </div>
                <div className="input">
                  <TextField
                    onChange={(value) => actions.setClientName(client.id, value)}
                    value={client.name}
                  />
                </div>
              </label>
              <label className="field dropdown field--condensed">
                <div className="name">
                  Group
                </div>
                <div className="input">
                  <SelectField
                    onChange={(value) => actions.setClientGroup(client.id, value)}
                    value={group.id}
                    options={[
                      ...groups.map((group) => ({
                        key: `client_${client.id}_group_${group.id}`,
                        value: group.id,
                        label: group.name,
                      })),
                      {
                        key: `client_${client.id}_new_group`,
                        value: group.id,
                        label: '+ New group',
                      },
                    ]}
                  />
                </div>
              </label>
              <div className="snapcast__client__latency field field--condensed">
                <div className="name">
                  Latency
                </div>
                <div className="input">
                  <LatencyControl
                    max="150"
                    value={client.latency}
                    onChange={(value) => actions.setClientLatency(client.id, parseInt(value))}
                  />
                  <TextField
                    className="tiny"
                    type="number"
                    onChange={(value) => actions.setClientLatency(client.id, parseInt(value))}
                    value={String(client.latency)}
                  />
                </div>
              </div>
              <div className="snapcast__client__volume field field--condensed">
                <VolumeControl
                  className="snapcast__volume-control snapcast__client__volume-control"
                  volume={client.volume}
                  mute={client.mute}
                  vertical
                  onVolumeChange={(percent) => actions.setClientVolume(client.id, percent, group.id)}
                />
                <MuteControl
                  className="snapcast__mute-control snapcast__client__mute-control"
                  mute={client.mute}
                  onMuteChange={(mute) => actions.setClientMute(client.id, mute)}
                />
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default SnapcastClients;
