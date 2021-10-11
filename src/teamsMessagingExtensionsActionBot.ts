// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  CardFactory,
  TeamsActivityHandler,
  TurnContext
} from 'botbuilder';

export class TeamsMessagingExtensionsActionBot extends TeamsActivityHandler {
  public async handleTeamsMessagingExtensionFetchTask(context: TurnContext, action: any): Promise<any> {
    const userId = context.activity.from.aadObjectId;
    const messageId = action.messagePayload.id;
    const convId = context.activity.conversation.id;

    const card = CardFactory.adaptiveCard({
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
          {
             "type": "TextBlock",
             "text": `User id: ${userId}`
          },
          {
            "type": "TextBlock",
            "text": `Message id: ${messageId}`
          },
          {
            "type": "TextBlock",
            "text": `Conv id: ${convId}`
          }
      ],
      "actions": [
          {
             "type": "Action.Submit",
             "title": "OK"
          }
      ]
    });

    return Promise.resolve({
      task: {
        value: {
          card
        },
        type: "continue"
      },
      responseType: "task"
    }); 
  }

  public async handleTeamsMessagingExtensionSubmitAction( context: TurnContext, action: any ): Promise<any> {
    return Promise.resolve();
  }
}