import {Button} from 'antd';
import {useNavigate} from 'react-router';
import {AppRoute} from 'src/config/app-route';

export const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex-grow-1 d-flex justify-content-center align-items-center">
      <Button
        type="primary"
        onClick={() => {
          navigate(AppRoute.DEVOPS_PIPELINES);
        }}>
        Devops Pipelines
      </Button>
    </div>
  );
};
