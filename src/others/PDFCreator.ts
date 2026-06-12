import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Camera, Scene, WebGLRenderer } from "three";
import RenderManager from "../managers/RenderManager";
import SceneManager from "../managers/SceneManager";
import Chair from "./Chair";
import MatPicker from "./MatPicker";

export default class PDFCreator {
    private font: string = "Helvetica";
    private color: string = "#2980ba";
    private logoPath: string = "assets/viewer3d-static/icons/favicon.png";
    private horizMargin: number = 20;

    private renderManager: RenderManager;
    private sceneManager: SceneManager;

    public constructor(renderer: RenderManager, scene: SceneManager) {
        this.renderManager = renderer;
        this.sceneManager = scene;
    }

    public downloadPDF(): void {
        const pdfFile: jsPDF = this.populateNewPDF();
        pdfFile.save("config.pdf");
    }

    public populateNewPDF(): jsPDF {
        const pdfFile: jsPDF = new jsPDF();

        this.addHeader(pdfFile);
        this.addRenders(pdfFile);
        this.addComponentsTable(pdfFile);
        this.addMaterialsTable(pdfFile);

        return pdfFile;
    }

    private addHeader(pdfFile: jsPDF): void {
        //title
        pdfFile.setTextColor(this.color);
        pdfFile.setFont(this.font, "bold");
        pdfFile.setFontSize(20);
        pdfFile.setCharSpace(2);
        pdfFile.text("CHAIR CONFIGURATION", 45, 15);

        //date
        pdfFile.setTextColor("#000000");
        pdfFile.setFont(this.font, "normal");
        pdfFile.setFontSize(11);
        pdfFile.setCharSpace(1);
        const now: Date = new Date();
        pdfFile.text(now.toISOString().split("T")[0], 90, 23); //convert to yyyy-mm-dd format

        //icons
        pdfFile.addImage(this.logoPath, "PNG", 14, 10, 15, 15);
        pdfFile.addImage(this.logoPath, "PNG", 180, 10, 15, 15);
    }

    private addRenders(pdfFile: jsPDF): void {
        const imgWidth: number = 136;
        const imgHeight: number = 83;

        const renderer: WebGLRenderer = this.renderManager.getRenderer();
        const scene: Scene = this.sceneManager.getScene();
        const frontCam: Camera = this.sceneManager.getFrontRenderCamera();
        const backCam: Camera = this.sceneManager.getBackRenderCamera();

        //front
        renderer.render(scene, frontCam);
        const imgDataFront: string = renderer.domElement.toDataURL("image/jpeg", 0.95);
        pdfFile.addImage(imgDataFront, "JPEG", 37, 30, imgWidth, imgHeight);

        //back
        renderer.render(scene, backCam);
        const imgDataBack: string = renderer.domElement.toDataURL("image/jpeg", 0.95);
        pdfFile.addImage(imgDataBack, "JPEG", 37, 116, imgWidth, imgHeight);
    }

    private addComponentsTable(pdfFile: jsPDF): void {
        const chair: Chair = this.sceneManager.getChair()!;

        pdfFile.setTextColor("#000000");
        pdfFile.setFont(this.font, "normal");
        pdfFile.setFontSize(11);
        pdfFile.setCharSpace(0);

        autoTable(pdfFile, {
            startY: 207,
            tableWidth: 170,
            margin: { left: this.horizMargin, right: this.horizMargin },
            tableLineColor: this.color,
            tableLineWidth: 0.5,
            columnStyles: {
                0: { cellWidth: 85 },
                1: { cellWidth: 85 }
            },
            head: [
                [{ content: "SELECTED COMPONENTS", colSpan: 2, styles: { halign: "center" } }]
            ],
            body: [
                ["BACK", chair.getCurBack().getName().toUpperCase()],
                ["SEAT", chair.getCurSeat().getName().toUpperCase()],
                ["LEG", chair.getCurLeg().getName().toUpperCase()],
                ["ARM", chair.getCurArm().getName().toUpperCase()]
            ]
        });
    }

    private addMaterialsTable(pdfFile: jsPDF): void {
        const matPicker: MatPicker = this.sceneManager.getMatPicker()!;
        const curFabricMat: string = matPicker.getCurFabricMat();
        const curMetalMat: string = matPicker.getCurMetalMat();
        const curPlasticMat: string = matPicker.getCurPlasticMat();

        autoTable(pdfFile, {
            startY: 250,
            margin: { left: this.horizMargin, right: this.horizMargin },
            tableLineColor: this.color,
            tableLineWidth: 0.5,
            tableWidth: 170,
            columnStyles: {
                0: { cellWidth: 85 },
                1: { cellWidth: 85 }
            },
            head: [
                [{ content: "SELECTED MATERIALS", colSpan: 2, styles: { halign: "center" } }]
            ],
            body: [
                ["FABRIC", curFabricMat.replace(".glb", "").toUpperCase()],
                ["METAL", curMetalMat.replace(".glb", "").toUpperCase()],
                ["PLASTIC", curPlasticMat.replace(".glb", "").toUpperCase()]
            ]
        });
    }
}