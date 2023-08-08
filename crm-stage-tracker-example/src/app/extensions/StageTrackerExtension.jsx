import React,{useState, useEffect} from 'react';
import {
  hubspot,
  Text,
  Button,
  Select,
  Form,
  Stack
} from '@hubspot/ui-extensions';
import { CrmStageTracker, CrmDataHighlight } from '@hubspot/ui-extensions/crm';

// Define the extension to be run within the Hubspot CRM
hubspot.extend(({ context, actions, runServerlessFunction }) => (
  <Extension
    context={context}
    runServerless={runServerlessFunction}
    fetchCrmObjectProperties = {actions.fetchCrmObjectProperties}
  />
));

const Extension = ({ context, runServerless , fetchCrmObjectProperties}) => {
  const [stage, setStage] = useState(null);
  const [showProperties, setShowProperties] = useState(true);
  const [dealId, setDealId] = useState(null);

  const stageToPropertiesMap = {
    "appointmentscheduled": ["dealname", "engagements_last_meeting_booked","dealtype"],
    "qualifiedtobuy": ["hubspot_owner_id", "amount", "dealtype","hs_priority"],
    "presentationscheduled":  ["hs_priority", "hs_deal_stage_probability","hs_forecast_amount"],
    "decisionmakerboughtin":  ["hs_deal_stage_probability", "hs_tcv", "amount", "notes_last_contacted"],
    "contractsent": ["createdate", "hs_acv", "hs_deal_stage_probability"],
    "closedwon":  ["closed_won_reason", "closedate", "amount"],
    "closedlost": ["closedate", "closed_lost_reason", "amount"],
  };
  // const options = [
  //   { value: 'appointmentscheduled', label: 'Appointment Scheduled' },
  //   { value: 'qualifiedtobuy', label: 'Qualified to Buy' },
  //   { value: 'presentationscheduled', label: 'Presentation Scheduled' },
  //   { value: 'decisionmakerboughtin', label: 'Decision Maker Bought In' },
  //   { value: 'contractsent', label: 'Contract Sent' },
  //   { value: 'closedwon', label: 'Closed Won' },
  //   { value: 'closedlost', label: 'Closed Lost' },
  // ];

  useEffect(() => {
    console.log("useEffect");
    fetchCrmObjectProperties(["dealstage","hs_object_id"]).then(properties => {
      setStage(properties.dealstage)
      setDealId(properties.hs_object_id)
    });
  }, [stage]);

  // const handleStageChange = (newStage) => {
  //   runServerless({
  //     name: 'update',
  //     parameters: {
  //       dealId: dealId,
  //       dealStage: newStage
  //     }
  //   }).then((resp) => {
  //     if (resp.status === 'success') {
  //       console.log("success");
  //       setStage(newStage);
  //     } else {
  //       console.log("error");
  //       console.log(resp.message);
  //     }
  //   });
  // };

  return (
    <Stack>
      <Text>View Important Details for Current Stage</Text>
      {/* <Form>
        <Select
          label="Update Deal Stage"
          name="deal-stage"
          tooltip="Please choose"
          value={stage}
          onChange={value => handleStageChange(value)}
          options={options}
        />
      </Form> */}
      <Button
        variant={showProperties ? 'primary' : 'secondary'}
        onClick={() => setShowProperties(!showProperties)}
      >
        {showProperties ? "Hide" : "Show"} Properties
      </Button>
      <CrmStageTracker
      properties={stageToPropertiesMap[stage]}
      showProperties={showProperties}
      />
      {showProperties && (
         <Stack className='properties-list'>
        <CrmDataHighlight properties={["dealname", "dealstage", "amount", "hs_acv"]} direction='row' />
      </Stack>
      )}
    </Stack>
  );
};
