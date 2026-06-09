import jsPDF from "jspdf";
import { Component } from "../generals/Enums";
import Part from "./Part";
import autoTable from "jspdf-autotable";

export default class Chair {
    private legs: Part[];
    private seats: Part[];
    private backs: Part[];
    private arms: Part[];
    private fixed: Part[];

    private allParts: Part[] = [];

    private curLeg: Part;
    private curSeat: Part;
    private curBack: Part;
    private curArm: Part;

    public constructor(legs: Part[], seats: Part[], backs: Part[], arms: Part[], fixed: Part[]) {
        this.curLeg = legs[0];
        this.curSeat = seats[0];
        this.curBack = backs[0];
        this.curArm = arms[0];

        this.legs = legs;
        this.seats = seats;
        this.backs = backs;
        this.arms = arms;
        this.fixed = fixed;

        this.allParts.push(...legs, ...seats, ...backs, ...arms, ...fixed);
        this.onlyCurrentVisible();
    }

    private onlyCurrentVisible(): void {
        this.allParts.forEach(part => part.setVisible(false));

        this.curLeg.setVisible(true);
        this.curSeat.setVisible(true);
        this.curBack.setVisible(true);
        this.curArm.setVisible(true);

        this.fixed.forEach(part => { part.setVisible(true); });
    }

    public setPart(chairPart: Component, newPart: string): void {
        let newCur: Part | undefined;
        switch (chairPart) {
            case Component.leg:
                newCur = this.legs.find((part) => part.getName() === newPart);
                if (!newCur) return;
                this.curLeg.setVisible(false);
                newCur.setVisible(true);
                this.curLeg = newCur;
                break;
            case Component.seat:
                newCur = this.seats.find((part) => part.getName() === newPart);
                if (!newCur) return;
                this.curSeat.setVisible(false);
                newCur.setVisible(true);
                this.curSeat = newCur;
                break;
            case Component.back:
                newCur = this.backs.find((part) => part.getName() === newPart);
                if (!newCur) return;
                this.curBack.setVisible(false);
                newCur.setVisible(true);
                this.curBack = newCur;
                break;
            case Component.arm:
                newCur = this.arms.find((part) => part.getName() === newPart);
                if (!newCur) return;
                this.curArm.setVisible(false);
                newCur.setVisible(true);
                this.curArm = newCur;
                break;
        }
    }

    public addChairDataToPDF(pdf: jsPDF): void {
        const leftMargin: number = 20;
        const YOffsetFromImg: number = 200;

        pdf.setTextColor(41, 128, 168);
        pdf.setFont("Helvetica", "Bold");
        pdf.setFontSize(20);
        pdf.setCharSpace(2);
        pdf.text("CHAIR CONFIGURATION", 45, 15);

        pdf.setFontSize(11);
        pdf.setTextColor(0, 0, 0);
        pdf.setCharSpace(1);
        pdf.setFont("Helvetica", "normal");
        const now: Date = new Date();
        pdf.text(now.toISOString().split("T")[0], 90, 23);

        pdf.addImage("assets/viewer3d-static/icons/favicon.png", "PNG", 14, 10, 15, 15);
        pdf.addImage("assets/viewer3d-static/icons/favicon.png", "PNG", 180, 10, 15, 15);


        pdf.setCharSpace(0);
        autoTable(pdf, {
            startY: YOffsetFromImg,
            tableWidth: 170,
            margin: { left: leftMargin, right: leftMargin },
            tableLineColor: [41, 128, 168],
            tableLineWidth: 0.5,
            columnStyles: {
                0: { cellWidth: 85 },
                1: { cellWidth: 85 }
            },
            head: [
                [{ content: "SELECTED COMPONENTS", colSpan: 2, styles: { halign: "center" } }]
            ],
            body: [
                ["BACK", this.getCurBack().getName().toUpperCase()],
                ["SEAT", this.getCurSeat().getName().toUpperCase()],
                ["LEG", this.getCurLeg().getName().toUpperCase()],
                ["ARM", this.getCurArm().getName().toUpperCase()]
            ]
        });
    }

    public getCurLeg(): Part { return this.curLeg; }

    public getCurSeat(): Part { return this.curSeat; }

    public getCurBack(): Part { return this.curBack; }

    public getCurArm(): Part { return this.curArm; }

    public getLegs(): Part[] { return this.legs; }

    public getSeats(): Part[] { return this.seats; }

    public getBacks(): Part[] { return this.backs; }

    public getArms(): Part[] { return this.arms; }

    public getFixed(): Part[] { return this.fixed; }

}
