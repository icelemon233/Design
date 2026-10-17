import { Button, Notification } from '@cinna-design/react';
export default function NotificationQueueDemo() {
  const [api, holder] = Notification.useNotification({ placement: 'bottomRight' });
  return (
    <>
      {holder}
      <Button
        onClick={() =>
          api.open({
            key: 'recipe',
            title: 'Recipe published',
            content: 'Cloud cake is ready to share.',
            type: 'success',
            duration: 0,
            actions: (
              <Button size="small" onClick={() => api.destroy('recipe')}>
                Dismiss publication
              </Button>
            ),
          })
        }
      >
        Show notification
      </Button>
    </>
  );
}
