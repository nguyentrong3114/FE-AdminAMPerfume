import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Oops! Có vẻ như bạn đã lạc đường rồi! 🤔"
            extra={[
                <div key="content" className="text-center">
                    <p className="mb-4 text-lg">Đừng lo lắng! Chúng tôi cũng hay bị lạc đường như bạn 😅</p>
                    <p className="mb-8 text-lg">Hay là chúng ta cùng quay về trang chủ nhé? 🏠</p>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => navigate("/")}
                    >
                        Về Trang Chủ Thôi! 🚀
                    </Button>
                </div>
            ]}
        />
    );
}
