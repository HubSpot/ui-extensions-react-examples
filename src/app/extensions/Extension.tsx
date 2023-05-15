import React, { useState } from "react";
import { AddAlertAction, Alert, Button, Context, Divider, ExtensionPointApi, Form, Input, ServerlessFuncRunner, Stack, hubspot } from "@hubspot/ui-extensions";

hubspot.extend<'crm.record.tab'>(({ context, runServerlessFunction, actions }) => <Extension context={context} runServerless={runServerlessFunction} sendAlert={actions.addAlert} />);

interface ExtensionProps {
  context: Context,
  runServerless: ServerlessFuncRunner,
  sendAlert: AddAlertAction
}

const Extension = ({ context, runServerless, sendAlert }: ExtensionProps) => {
  const [text, setText] = useState('')

  const run = () => {
    runServerless({ name: 'myFunc', parameters: { text: text } }).then(resp => sendAlert({ message: resp.response }))
  }

  return <>
    <Alert title={`Hello ${context.user.firstName}, your first UI Extension is ready!`} body='Congratulations! You just deployed your first HubSpot UI extension.' />
    <Divider />
    <Stack>
      <Input name='text' label="Send to serverless" onInput={(t) => setText(t)} />
      <Button type='submit' onClick={run}>Click me</Button>
    </Stack>

  </>
}
