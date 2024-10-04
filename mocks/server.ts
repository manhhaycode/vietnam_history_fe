/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { IConversation } from '@/features/conversations';
import { createServer, Model, Registry, Response } from 'miragejs';
import { ModelDefinition } from 'miragejs/-types';
import Schema from 'miragejs/orm/schema';
import { conversations } from './fixtures/conversations';
import config from '@/configs';

// const checkValidToken = (token: string) => {
//   if (token) {
//     const [timeOut, id] = token.split(" ")[1].split("-");
//     if (timeOut && id && Date.now() <= parseInt(timeOut)) {
//       return id;
//     }
//   }
//   throw Error("Unauthorized");
// };

const parseBodyPaginate = (body: any) => {
  const { page = 1, size = 10 } = body;
  return {
    page: parseInt(page),
    size: parseInt(size),
    ...body,
  };
};

const ConversationModel: ModelDefinition<IConversation> = Model.extend({});

type AppRegistry = Registry<
  {
    conversation: typeof ConversationModel;
  },
  {}
>;
type AppSchema = Schema<AppRegistry>;

export function makeServer({ environment = 'test' } = {}) {
  const server = createServer({
    environment,
    models: {
      conversation: ConversationModel,
    },
    fixtures: {
      conversations,
    },

    seeds(server) {
      server.loadFixtures();
    },

    routes() {
      this.namespace = '/api';

      this.post('/conversations', (schema: AppSchema, request) => {
        const body = parseBodyPaginate(request.requestBody);
        const list = schema.all('conversation').models.map((conversation) => conversation.attrs);
        return {
          data: list.slice((body.page - 1) * body.size, body.page * body.size),
          total: list.length,
          size: body.size,
          page: body.page,
        };
      });

      this.get('/conversations/:id', (schema: AppSchema, request) => {
        const { id } = request.params;
        return (
          schema.find('conversation', id)?.attrs ||
          new Response(404, {
            message: 'Conversation not found',
          })
        );
      });

      this.post('/conversations/create', (schema: AppSchema, request) => {
        const attrs = JSON.parse(request.requestBody);

        return schema.create('conversation', attrs);
      });

      this.put('/conversations/:id', (schema: AppSchema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const { id } = request.params;
        const conversation = schema.find('conversation', id);
        if (conversation) {
          conversation.update(attrs);
          return conversation.attrs;
        } else {
          return new Response(404, {
            message: 'Conversation not found',
          });
        }
      });

      this.delete('/conversations/:id', (schema: AppSchema, request) => {
        const { id } = request.params;
        const conversation = schema.find('conversation', id);
        if (conversation) {
          conversation.destroy();
          return new Response(204);
        } else {
          return new Response(404, {
            message: 'Conversation not found',
          });
        }
      });

      this.passthrough(config.API.API_URL);
    },
  });

  return server;
}
